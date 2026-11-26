/** Checks the shape of a UK postcode, for example "SW1A 1AA" or "m11ae". It does not check the postcode exists. */
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

export function isValidUkPostcode(value: string) {
  return UK_POSTCODE.test(value.trim());
}

/** Tidies a valid postcode: capitals, and one space before the last three characters ("sw1a1aa" becomes "SW1A 1AA"). */
export function formatPostcode(value: string) {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}
