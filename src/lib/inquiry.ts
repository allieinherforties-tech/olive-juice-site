/** Pre-filled inquiry email so starting a conversation takes one click. */
export function buildInquiryMailto(email: string): string {
  const subject = "Discovery sprint inquiry";
  const body = [
    "Hi Allie,",
    "",
    "Organization:",
    "What we do:",
    "The part of our week I'd most like to get back:",
    "Tools we already use:",
    "",
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
