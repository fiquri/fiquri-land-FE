export interface Product {
  id: string
  name: string
  number: string
  description: string
  features: string[]
  ctaText: string
}

export interface InquiryFormData {
  productId: string
  name: string
  email: string
  company: string
  website: string
  message: string
}
