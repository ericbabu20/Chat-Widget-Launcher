import type { HTMLInputTypeAttribute, ReactNode } from "react";
import type { FieldName } from "./interestForm";

type ChangeHandler = (name: FieldName, value: string) => void;

type Option = { value: string; label: string };

function fieldId(name: string) {
  return `bz-${name}`;
}

type FieldShellProps = {
  name: FieldName;
  label: string;
  optional?: boolean;
  wide?: boolean;
  error?: string;
  children: ReactNode;
};

function FieldShell({ name, label, optional, wide, error, children }: FieldShellProps) {
  const id = fieldId(name);
  return (
    <div className={`bz-field${wide ? " bz-field--wide" : ""}${error ? " bz-field--error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="bz-field__optional"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p className="bz-field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = {
  name: FieldName;
  label: string;
  value: string;
  onChange: ChangeHandler;
  error?: string;
  optional?: boolean;
  wide?: boolean;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  min?: string;
};

export function TextField({
  name,
  label,
  value,
  onChange,
  error,
  optional,
  wide,
  type = "text",
  autoComplete,
  inputMode,
  min,
}: TextFieldProps) {
  const id = fieldId(name);
  return (
    <FieldShell error={error} label={label} name={name} optional={optional} wide={wide}>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        min={min}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        type={type}
        value={value}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  name: FieldName;
  label: string;
  value: string;
  options: Option[];
  onChange: ChangeHandler;
  error?: string;
  /** Text for the empty choice. Leave out when there is always a real choice, such as Yes or No. */
  placeholder?: string;
  autoComplete?: string;
};

export function SelectField({ name, label, value, options, onChange, error, placeholder, autoComplete }: SelectFieldProps) {
  const id = fieldId(name);
  return (
    <FieldShell error={error} label={label} name={name}>
      <select
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        id={id}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        value={value}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type PillOption = Option & { icon?: ReactNode };

type PillGroupProps = {
  name: FieldName;
  legend: string;
  /** Hides the legend visually (screen readers still read it) when a heading above already says it. */
  legendHidden?: boolean;
  value: string;
  options: PillOption[];
  onChange: ChangeHandler;
};

/** Big rounded choice buttons, like "Small Business / Large Business". Real radio buttons underneath. */
export function PillGroup({ name, legend, legendHidden, value, options, onChange }: PillGroupProps) {
  return (
    <fieldset className="bz-fieldset">
      <legend className={legendHidden ? "bz-sr-only" : "bz-legend"}>{legend}</legend>
      <div className="bz-pills">
        {options.map((option) => (
          <label className="bz-pill" key={option.value}>
            <input
              checked={value === option.value}
              name={name}
              onChange={() => onChange(name, option.value)}
              type="radio"
              value={option.value}
            />
            <span>
              {option.icon}
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type YesNoFieldProps = {
  name: FieldName;
  legend: string;
  value: string;
  onChange: ChangeHandler;
};

export function YesNoField({ name, legend, value, onChange }: YesNoFieldProps) {
  return (
    <fieldset className="bz-fieldset bz-field--wide">
      <legend className="bz-legend">{legend}</legend>
      {(["yes", "no"] as const).map((choice) => (
        <label className="bz-radio" key={choice}>
          <input checked={value === choice} name={name} onChange={() => onChange(name, choice)} type="radio" value={choice} />
          {choice === "yes" ? "Yes" : "No"}
        </label>
      ))}
    </fieldset>
  );
}
