"use client";

import FaqCard from "@/components/cards/FAQs";

interface Faq {
  question: string;
  answer: string;
}

export default function FAQsSection() {
  const faqs: Faq[] = [
    { question: 'What is Plaeen?', answer: 'Plaeen is a platform designed to help gamers easily schedule gaming sessions with friends.' },
    { question: 'How much does Plaeen cost?', answer: 'Plaeen offers various pricing plans to suit different needs. Visit our pricing page for more details.' },
    { question: 'How do I cancel?', answer: 'You can cancel your subscription anytime from your account settings page.' },
    { question: 'How does it work?', answer: 'Plaeen integrates with your calendar to find the best times for you and your friends to play together.' },
    { question: 'Is Plaeen safe for children?', answer: "Plaeen is designed for a mature audience and focuses on closed friend circles. While we cannot guarantee complete safety online, Plaeen's privacy features (closed groups, no random invites) create a safer environment for gamers, especially those who may be concerned about inappropriate content."}
  ];

  return (
    <div className="relative mt-28">
        <h2 className="mb-10 font-sofia text-neonGreen text-left text-[38px] xs:top-[100px] sm:top-[80px] left-0 w-[72%] mx-auto">
            Frequently Asked Questions
        </h2>
        <div className="xxs:w-[100%] md:w-[80%] mx-auto">
            {faqs.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    </div>
  );
}
