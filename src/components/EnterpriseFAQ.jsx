import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: '01',
      question: 'What types of projects does Netcraft Studio take on?',
      answer: 'We engineer mission-critical digital products, high-throughput web applications, native & cross-platform mobile apps, custom internal enterprise tooling, and AI-powered automation workflows. Every project is architected with strict performance standards, clean type safety, and production resilience.'
    },
    {
      id: '02',
      question: 'Can you build directly from an early-stage concept or napkin sketch?',
      answer: 'Yes. A large percentage of our engagements originate as early-stage product hypotheses or complex operational bottlenecks. During our initial discovery and scoping phase, we define the product requirements, user journeys, schema architecture, and technical roadmap before any production code is committed.'
    },
    {
      id: '03',
      question: 'Can you review, modernize, or refactor an existing legacy application?',
      answer: 'Absolutely. We specialize in legacy modernization—auditing monolithic codebases, untangling technical debt, refactoring old stacks into modern cloud-native architectures, and re-engineering outdated interfaces into sub-second reactive systems with zero unscheduled downtime.'
    },
    {
      id: '04',
      question: 'What is your policy on Intellectual Property (IP) and code ownership?',
      answer: '100% of the intellectual property, source code, designs, design systems, documentation, and infrastructure configurations belong entirely to you upon milestone delivery. We work under strict enterprise mutual Non-Disclosure Agreements (NDAs) and never hold your codebase hostage.'
    },
    {
      id: '05',
      question: 'Which third-party APIs, cloud providers, and platforms do you integrate?',
      answer: 'We integrate with modern cloud providers (AWS, Google Cloud, Vercel, Docker), AI model providers (OpenAI, Anthropic, HuggingFace, Vector DBs), enterprise auth (OAuth2, Auth0, Clerk, Okta), payment gateways (Stripe, Adyen), and custom ERP/CRM webhooks.'
    },
    {
      id: '06',
      question: 'Do you provide post-launch SLA maintenance and ongoing iteration?',
      answer: 'Yes. We partner with clients long-term post-launch. We provide dedicated tier-1 support, proactive security patching, database optimization, feature enhancements, and continuous integration/continuous deployment (CI/CD) monitoring as your user base scales.'
    },
    {
      id: '07',
      question: 'How does an engagement begin and what is the typical turnaround?',
      answer: 'It starts with an exploratory scoping discussion. Within 48 hours of our initial session, we produce a structured technical proposal with architecture schematics, milestone deliverables, and fixed sprint estimates. Sprints typically commence within 1 to 2 weeks.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section section-light faq-section" id="faq">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header-block">
          <div className="eyebrow-decorated">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">FAQ</span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-line"></span>
          </div>

          <h2 className="faq-main-heading">
            Frequently Asked <em>Questions.</em>
          </h2>

          <p className="faq-subtitle">
            Clear, transparent answers to critical questions about engineering standards, IP ownership, and project delivery with Netcraft Studio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`faq-card ${isOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="faq-trigger">
                  <div className="faq-trigger-left">
                    <span className="faq-num">{faq.id}</span>
                    <h3 className="faq-question">{faq.question}</h3>
                  </div>
                  <div className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="faq-cta-prompt">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={20} color="var(--blue)" />
            <span style={{ fontSize: '14px', color: 'var(--ink)' }}>
              Have a specific technical constraint or non-standard requirement?
            </span>
          </div>
          <Link to="/contact" className="button button-quiet" style={{ fontSize: '12px', padding: '8px 16px' }}>
            Speak directly with a founder <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
