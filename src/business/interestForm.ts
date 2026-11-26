export type BusinessSize = "small" | "large";
export type EnergyType = "both" | "electricity" | "gas";
export type YesNo = "yes" | "no";

export type AddressGroup = "org" | "site" | "billing";
export type AddressPart = "Line1" | "Line2" | "City" | "County" | "Postcode";
export type AddressKey = `${AddressGroup}${AddressPart}`;

type PlainFields = {
  size: BusinessSize;
  energyType: EnergyType;
  title: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  companyType: string;
  companyName: string;
  companyNumber: string;
  siteSameAsOrg: YesNo;
  supplyStartDate: string;
  multipleSites: YesNo;
  mpan: string;
  mprn: string;
  electricityKwh: string;
  gasKwh: string;
  billingSameAsOrg: YesNo;
};

export type InterestValues = PlainFields & Record<AddressKey, string>;
export type FieldName = keyof InterestValues;
export type FormErrors = Partial<Record<FieldName, string>>;

export const emptyValues: InterestValues = {
  size: "small",
  energyType: "both",
  title: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  email: "",
  phone: "",
  companyType: "",
  companyName: "",
  companyNumber: "",
  orgLine1: "",
  orgLine2: "",
  orgCity: "",
  orgCounty: "",
  orgPostcode: "",
  siteSameAsOrg: "yes",
  siteLine1: "",
  siteLine2: "",
  siteCity: "",
  siteCounty: "",
  sitePostcode: "",
  supplyStartDate: "",
  multipleSites: "no",
  mpan: "",
  mprn: "",
  electricityKwh: "",
  gasKwh: "",
  billingSameAsOrg: "yes",
  billingLine1: "",
  billingLine2: "",
  billingCity: "",
  billingCounty: "",
  billingPostcode: "",
};

export const TITLE_OPTIONS = ["Mr", "Mrs", "Ms", "Miss", "Mx", "Dr", "Other"].map((value) => ({ value, label: value }));

// Placeholder list. Confirm the final company types with the business team.
export const COMPANY_TYPE_OPTIONS = [
  { value: "limited", label: "Limited company" },
  { value: "sole-trader", label: "Sole trader" },
  { value: "partnership", label: "Partnership" },
  { value: "charity", label: "Charity" },
  { value: "other", label: "Other" },
];

export const YES_NO_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export function addressKey(group: AddressGroup, part: AddressPart): AddressKey {
  return `${group}${part}` as AddressKey;
}

/** Today as YYYY-MM-DD in the visitor's own time zone. Used as the earliest start date. */
export function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UK_POSTCODE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;

function validateAddress(values: InterestValues, group: AddressGroup, errors: FormErrors) {
  const read = (part: AddressPart) => values[addressKey(group, part)].trim();

  if (!read("Line1")) errors[addressKey(group, "Line1")] = "Enter the first line of the address";
  if (!read("City")) errors[addressKey(group, "City")] = "Enter a city or town";

  const postcode = read("Postcode");
  if (!postcode) errors[addressKey(group, "Postcode")] = "Enter a postcode";
  else if (!UK_POSTCODE.test(postcode)) errors[addressKey(group, "Postcode")] = "Enter a valid UK postcode";
}

function validateKwh(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const amount = Number(trimmed.replace(/,/g, ""));
  return Number.isFinite(amount) && amount > 0 ? undefined : "Enter a number greater than 0";
}

/** Returns one message per field that needs fixing. An empty object means the form is ready to send. */
export function validate(values: InterestValues): FormErrors {
  const errors: FormErrors = {};
  const wantsElectricity = values.energyType !== "gas";
  const wantsGas = values.energyType !== "electricity";

  if (!values.title) errors.title = "Select your title";
  if (!values.firstName.trim()) errors.firstName = "Enter your first name";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name";
  if (!values.jobTitle.trim()) errors.jobTitle = "Enter your job title";

  if (!values.email.trim()) errors.email = "Enter your email address";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Enter a valid email address";

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Enter a contact number";
  else if (!/^[+\d\s()-]+$/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = "Enter a valid contact number";
  }

  if (!values.companyType) errors.companyType = "Select your company type";
  if (!values.companyName.trim()) errors.companyName = "Enter your company name";

  const companyNumber = values.companyNumber.trim();
  if (!companyNumber && values.companyType === "limited") {
    errors.companyNumber = "Enter your company number";
  } else if (companyNumber && !/^[A-Za-z0-9]{8}$/.test(companyNumber)) {
    errors.companyNumber = "A company number has 8 letters or numbers";
  }

  validateAddress(values, "org", errors);
  if (values.siteSameAsOrg === "no") validateAddress(values, "site", errors);
  if (values.billingSameAsOrg === "no") validateAddress(values, "billing", errors);

  if (!values.supplyStartDate) errors.supplyStartDate = "Choose your desired start date";
  else if (values.supplyStartDate < todayIso()) errors.supplyStartDate = "The start date can't be in the past";

  const mpan = values.mpan.replace(/\s/g, "");
  if (wantsElectricity && mpan && !/^\d{13,21}$/.test(mpan)) {
    errors.mpan = "Check your MPAN. It is usually a 13 digit number";
  }

  const mprn = values.mprn.replace(/\s/g, "");
  if (wantsGas && mprn && !/^\d{6,10}$/.test(mprn)) {
    errors.mprn = "Check your MPRN. It is 6 to 10 digits";
  }

  if (wantsElectricity) {
    const message = validateKwh(values.electricityKwh);
    if (message) errors.electricityKwh = message;
  }
  if (wantsGas) {
    const message = validateKwh(values.gasKwh);
    if (message) errors.gasKwh = message;
  }

  return errors;
}

/**
 * Sends the registration somewhere.
 *
 * TODO: this does not send anything yet. Replace the body with a call to the real service
 * (for example a CRM or an email endpoint). Throw an error if the request fails and the form
 * will show a "try again" message.
 */
export async function submitInterest(_values: InterestValues): Promise<void> {
  return Promise.resolve();
}
