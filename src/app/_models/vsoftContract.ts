export interface VsoftContract {
  id: string; // Contract Number
  a010: string; // InsuranceCompany code (cdv belgium)
  vs99?: string; // Description 1
  vs98?: string; // Description 2
  vs97?: string; // Actioncode 7=suspended, 8=various, 9=canceled
  aw2?: string; // Einddatum
  a325?: string; // Splitsing
}
