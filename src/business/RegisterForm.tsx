import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { smallBusinessDefinition } from "./content";
import { PillGroup, SelectField, TextField, YesNoField } from "./FormFields";
import {
  type AddressGroup,
  type AddressPart,
  COMPANY_TYPE_OPTIONS,
  emptyValues,
  type FieldName,
  type FormErrors,
  type InterestValues,
  submitInterest,
  TITLE_OPTIONS,
  todayIso,
  validate,
  YES_NO_OPTIONS,
  addressKey,
} from "./interestForm";

function BoltIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M12.6 2c.5 3.6 4.9 5.6 4.9 10.6a5.5 5.5 0 0 1-11 0c0-2 .9-3.4 2-4.4.1 1.6.8 2.7 1.9 3.1C9.7 7.9 10.6 4.4 12.6 2Z" />
    </svg>
  );
}

const SIZE_OPTIONS = [
  { value: "small", label: "Small Business" },
  { value: "large", label: "Large Business" },
];

const ENERGY_OPTIONS = [
  {
    value: "both",
    label: "Electricity & Gas",
    icon: (
      <span className="bz-pill__icons">
        <BoltIcon />
        <span aria-hidden="true">+</span>
        <FlameIcon />
      </span>
    ),
  },
  { value: "electricity", label: "Electricity", icon: <BoltIcon /> },
  { value: "gas", label: "Gas", icon: <FlameIcon /> },
];

type AddressFieldsProps = {
  group: AddressGroup;
  values: InterestValues;
  errors: FormErrors;
  onChange: (name: FieldName, value: string) => void;
};

function AddressFields({ group, values, errors, onChange }: AddressFieldsProps) {
  // Browser autofill is only switched on for the main company address.
  const auto = group === "org";
  const field = (part: AddressPart) => {
    const name = addressKey(group, part);
    return { name, value: values[name], error: errors[name], onChange };
  };

  return (
    <div className="bz-grid">
      <TextField {...field("Line1")} autoComplete={auto ? "address-line1" : undefined} label="Address line 1" wide />
      <TextField {...field("Line2")} autoComplete={auto ? "address-line2" : undefined} label="Address line 2" optional wide />
      <TextField {...field("City")} autoComplete={auto ? "address-level2" : undefined} label="City / town" />
      <TextField {...field("County")} autoComplete={auto ? "address-level1" : undefined} label="County" optional />
      <TextField {...field("Postcode")} autoComplete={auto ? "postal-code" : undefined} label="Postcode" />
    </div>
  );
}

type RegisterFormProps = {
  onSubmitted: () => void;
};

export function RegisterForm({ onSubmitted }: RegisterFormProps) {
  const [values, setValues] = useState<InterestValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "failed">("idle");
  const [focusToken, setFocusToken] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const today = useMemo(todayIso, []);

  const wantsElectricity = values.energyType !== "gas";
  const wantsGas = values.energyType !== "electricity";
  const hasErrors = Object.keys(errors).length > 0;

  // After a failed submit, move the cursor to the first field that needs fixing.
  useEffect(() => {
    if (focusToken === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [focusToken]);

  function change(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setFocusToken((token) => token + 1);
      return;
    }

    setStatus("submitting");
    try {
      await submitInterest(values);
      onSubmitted();
    } catch {
      setStatus("failed");
    }
  }

  const text = (name: FieldName) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: change,
  });

  return (
    <form className="bz-form" noValidate onSubmit={handleSubmit} ref={formRef}>
      <section aria-labelledby="bz-h-business" className="bz-form-section">
        <h2 id="bz-h-business">Your business</h2>
        <PillGroup
          legend="What size is your business?"
          name="size"
          onChange={change}
          options={SIZE_OPTIONS}
          value={values.size}
        />
        <div className="bz-infobox">
          <p className="bz-infobox__title">{smallBusinessDefinition.title}</p>
          <p className="bz-infobox__row">
            <BoltIcon />
            {smallBusinessDefinition.usage}
          </p>
          <p className="bz-infobox__note">{smallBusinessDefinition.note}</p>
        </div>
      </section>

      <section aria-labelledby="bz-h-energy" className="bz-form-section">
        <h2 id="bz-h-energy">Your energy needs</h2>
        <PillGroup
          legend="Energy type"
          legendHidden
          name="energyType"
          onChange={change}
          options={ENERGY_OPTIONS}
          value={values.energyType}
        />
      </section>

      <section aria-labelledby="bz-h-contact" className="bz-form-section">
        <h2 id="bz-h-contact">Your contact details</h2>
        <div className="bz-grid">
          <SelectField
            {...text("title")}
            autoComplete="honorific-prefix"
            label="Title"
            options={TITLE_OPTIONS}
            placeholder="Select title"
          />
          <TextField {...text("jobTitle")} autoComplete="organization-title" label="Job title" />
          <TextField {...text("firstName")} autoComplete="given-name" label="First name" />
          <TextField {...text("lastName")} autoComplete="family-name" label="Last name" />
          <TextField {...text("email")} autoComplete="email" inputMode="email" label="Email address" type="email" />
          <TextField {...text("phone")} autoComplete="tel" inputMode="tel" label="Contact number" type="tel" />
        </div>
      </section>

      <section aria-labelledby="bz-h-company" className="bz-form-section">
        <h2 id="bz-h-company">About your organisation</h2>
        <div className="bz-grid">
          <SelectField
            {...text("companyType")}
            label="Company type"
            options={COMPANY_TYPE_OPTIONS}
            placeholder="Select company type"
          />
          <TextField {...text("companyName")} autoComplete="organization" label="Company name" />
          <TextField {...text("companyNumber")} label="Company number" optional={values.companyType !== "limited"} />
        </div>
        <h3 className="bz-subheading">Organisation details (company registered address)</h3>
        <AddressFields errors={errors} group="org" onChange={change} values={values} />
        <div className="bz-followup">
          <YesNoField
            legend="Is the site address the same as the organisation address?"
            {...text("siteSameAsOrg")}
          />
        </div>
        {values.siteSameAsOrg === "no" && (
          <>
            <h3 className="bz-subheading">Site address</h3>
            <AddressFields errors={errors} group="site" onChange={change} values={values} />
          </>
        )}
      </section>

      <section aria-labelledby="bz-h-usage" className="bz-form-section">
        <h2 id="bz-h-usage">About your energy</h2>
        <div className="bz-grid">
          <TextField {...text("supplyStartDate")} label="Your desired supply start date" min={today} type="date" />
          <SelectField {...text("multipleSites")} label="Multiple sites" options={YES_NO_OPTIONS} />
          {wantsElectricity && <TextField {...text("mpan")} inputMode="numeric" label="Enter your MPAN" optional />}
          {wantsGas && <TextField {...text("mprn")} inputMode="numeric" label="Enter your MPRN" optional />}
        </div>

        <div aria-labelledby="bz-h-consumption" role="group">
          <h3 className="bz-subheading" id="bz-h-consumption">
            Total estimated annual consumption <span className="bz-field__optional">(optional)</span>
          </h3>
          <div className="bz-grid">
            {wantsElectricity && (
              <TextField {...text("electricityKwh")} inputMode="decimal" label="Electricity usage (kWh)" />
            )}
            {wantsGas && <TextField {...text("gasKwh")} inputMode="decimal" label="Gas usage (kWh)" />}
          </div>
        </div>

        <div className="bz-followup">
          <YesNoField
            legend="Is your billing address the same as your company registered address?"
            {...text("billingSameAsOrg")}
          />
        </div>
        {values.billingSameAsOrg === "no" && (
          <>
            <h3 className="bz-subheading">Billing address</h3>
            <AddressFields errors={errors} group="billing" onChange={change} values={values} />
          </>
        )}
      </section>

      <div className="bz-form__footer">
        <button className="bz-cta bz-cta--submit" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Submitting…" : "Submit"}
        </button>
        <div aria-live="polite">
          {hasErrors && <p className="bz-form__alert">Some details need fixing. Check the fields marked in red.</p>}
          {status === "failed" && <p className="bz-form__alert">Something went wrong. Please try again.</p>}
        </div>
      </div>
    </form>
  );
}
