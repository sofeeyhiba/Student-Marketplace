const form = document.querySelector("#onboarding-form");
const steps = [...document.querySelectorAll(".wizard-step")];
const nextButton = document.querySelector("#next-button");
const previousButton = document.querySelector("#previous-button");
const actions = document.querySelector("#wizard-actions");
const progressFill = document.querySelector("#progress-fill");
const stepKicker = document.querySelector("#step-kicker");
const stepCount = document.querySelector("#step-count");
const errorMessage = document.querySelector("#form-error");
const buyerCategories = document.querySelector("#buyer-categories");
const sellerCategories = document.querySelector("#seller-categories");

let currentStep = 0;
let selectedRole = "";

function showStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => {
    step.hidden = stepIndex !== index;
  });

  const isComplete = index === steps.length - 1;
  const visibleStep = Math.min(index + 1, 4);
  stepKicker.textContent = isComplete ? "PROFILE PREVIEW" : `STEP ${visibleStep} OF 4`;
  stepCount.textContent = isComplete ? "DONE" : `${String(visibleStep).padStart(2, "0")} / 04`;
  progressFill.style.width = isComplete ? "100%" : `${visibleStep * 25}%`;
  previousButton.hidden = index === 0 || isComplete;
  actions.hidden = isComplete;
  errorMessage.hidden = true;

  const heading = document.querySelector("#setup-title");
  heading.textContent = isComplete
    ? "Your campus profile"
    : ["How will you use S-MART?", "Let’s make it yours", "Where’s your campus?", "Tune your marketplace"][index];
}

function validateStep() {
  const activeStep = steps[currentStep];

  if (currentStep === 0 && !form.querySelector('input[name="role"]:checked')) {
    return "Choose whether you want to shop, sell, or do both.";
  }

  const requiredFields = [...activeStep.querySelectorAll("[required]")];
  for (const field of requiredFields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return "Please complete the required information to continue.";
    }
  }

  if (currentStep === 3) {
    const buyerSelected = buyerCategories.hidden
      || buyerCategories.querySelectorAll('input:checked').length > 0;
    const sellerSelected = sellerCategories.hidden
      || sellerCategories.querySelectorAll('input:checked').length > 0;

    if (!buyerSelected || !sellerSelected) {
      return "Choose at least one category for each part of your S-MART experience.";
    }
  }

  return "";
}

function updateRolePreferences() {
  selectedRole = form.querySelector('input[name="role"]:checked').value;
  const isBuyer = selectedRole === "buyer" || selectedRole === "both";
  const isSeller = selectedRole === "seller" || selectedRole === "both";

  buyerCategories.hidden = !isBuyer;
  sellerCategories.hidden = !isSeller;

  document.querySelector("#preferences-intro").textContent = selectedRole === "both"
    ? "Choose categories for what you want to shop for and what you plan to sell."
    : selectedRole === "seller"
      ? "Pick the kinds of products or services you plan to offer."
      : "Pick the kinds of listings you want to see in your marketplace feed.";
}

function finishOnboarding() {
  const fullName = form.elements.fullName.value.trim();
  const campusArea = form.elements.campusArea.value;
  const firstName = fullName.split(/\s+/)[0];
  const roleLabel = {
    buyer: "shop on S-MART",
    seller: "sell on S-MART",
    both: "shop and sell on S-MART"
  }[selectedRole];

  document.querySelector("#completion-summary").textContent =
    `Nice to meet you, ${firstName}. Your profile is set up to ${roleLabel} around ${campusArea.toLowerCase()} at UNILORIN.`;
  showStep(steps.length - 1);
}

nextButton.addEventListener("click", () => {
  const validationError = validateStep();
  if (validationError) {
    errorMessage.textContent = validationError;
    errorMessage.hidden = false;
    return;
  }

  if (currentStep === 0) {
    updateRolePreferences();
  }

  if (currentStep === 3) {
    finishOnboarding();
    return;
  }

  showStep(currentStep + 1);
});

previousButton.addEventListener("click", () => {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});

form.addEventListener("change", () => {
  errorMessage.hidden = true;
});

showStep(0);
