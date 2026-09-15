import type { Faq } from '@/lib/types';

export const faqs: Faq[] = [
  {
    id: 'walk-ins',
    category: 'Visits',
    question: 'Do you accept walk-in patients?',
    answer:
      'Yes. Walk-ins are welcome at every branch, but calling ahead means shorter waiting times, especially on weekends.',
  },
  {
    id: 'exam-length',
    category: 'Eye exams',
    question: 'How long does an eye exam take?',
    answer:
      'A comprehensive eye exam takes about 45 minutes. Allow extra time if you also want to choose frames.',
  },
  {
    id: 'exam-frequency',
    category: 'Eye exams',
    question: 'How often should I have my eyes checked?',
    answer:
      'Most adults should have an eye exam every one to two years. Children, contact lens wearers and people with diabetes may need yearly checks.',
  },
  {
    id: 'bring-to-visit',
    category: 'Visits',
    question: 'What should I bring to my visit?',
    answer:
      'Bring your current glasses or contact lenses, any previous prescription, and a list of medicines you take.',
  },
  {
    id: 'glasses-ready',
    category: 'Eyewear',
    question: 'How soon will my new glasses be ready?',
    answer:
      'Single-vision glasses are usually ready in three to five days. Progressive and specialised lenses can take up to two weeks.',
  },
  {
    id: 'outside-prescription',
    category: 'Eyewear',
    question: 'Can I use a prescription from another clinic?',
    answer:
      'Yes, as long as it is recent and complete. We may recommend a new exam if it is more than two years old.',
  },
  {
    id: 'kids-age',
    category: 'Eye exams',
    question: 'From what age can children have an eye exam?',
    answer:
      'We see children from about three years old. A first exam before starting school is a good idea.',
  },
  {
    id: 'contacts-first-time',
    category: 'Eyewear',
    question: 'I have never worn contact lenses. Can I try them?',
    answer:
      'Yes. A contact lens fitting includes trial lenses and a lesson on putting them in, taking them out and keeping them clean.',
  },
  {
    id: 'payment-methods',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, major credit and debit cards, and popular e-wallets at every branch.',
  },
  {
    id: 'hmo',
    category: 'Payments',
    question: 'Do you accept HMO cards?',
    answer:
      'Coverage depends on your HMO plan. Call your preferred branch before your visit and we will check for you.',
  },
  {
    id: 'repairs-other-shops',
    category: 'Eyewear',
    question: 'Can you adjust glasses I bought somewhere else?',
    answer:
      'Of course. Bring them in and we will tighten, adjust or replace small parts where possible.',
  },
  {
    id: 'parking',
    category: 'Visits',
    question: 'Is there parking near your branches?',
    answer:
      'All three branches are inside buildings or malls with paid parking. Each branch page will list the nearest entrance.',
  },
];
