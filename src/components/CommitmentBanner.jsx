import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommitmentBanner() {
  return (
    <div className="commitment-banner-wrap">
      <div className="commitment-banner">
        {/* Left Side: Shield + Commitment statement */}
        <div className="commitment-left">
          <div className="commitment-badge-box">
            <ShieldCheck size={28} color="var(--cyan)" />
          </div>
          <div className="commitment-text-group">
            <h3 className="commitment-title">
              Our Studio Commitment
            </h3>
            <p className="commitment-desc">
              We do not write speculative code or deliver disposable templates. We architect mission-critical 
              software systems engineered to eliminate operational friction, withstand rigorous audit, and 
              create enduring enterprise enterprise value.
            </p>
          </div>
        </div>

        {/* Center Divider */}
        <div className="commitment-divider" aria-hidden="true"></div>

        {/* Right Side: Vision quote + Scoping link */}
        <div className="commitment-right">
          <div className="commitment-accent-bar" aria-hidden="true"></div>
          <div className="commitment-quote-group">
            <p className="commitment-vision-text">
              Zero junior handoffs. Direct partner ownership.<br />
              Mathematically precise. Serious about your success.
            </p>
            <Link to="/contact" className="commitment-action-link">
              <span>Let's architect something that endures</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
