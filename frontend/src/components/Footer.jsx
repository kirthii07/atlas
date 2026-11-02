import React from 'react';
import { Compass, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white py-12 text-slate-600 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                ATLAS <span className="font-medium text-xs text-slate-500">by People4Good</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              An open, confidential digital transformation diagnostic for grassroots charities and community-based non-profits. Built to empower social changemakers with zero-cost, high-impact cloud tools.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
              <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
              <span>Dedicated to frontline community impact</span>
            </div>
          </div>

          {/* Non-Profit Programs */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Free Verified NGO Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.google.com/nonprofits/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-700 inline-flex items-center gap-1 text-slate-600"
                >
                  <span>Google for Nonprofits</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.techsoup.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-700 inline-flex items-center gap-1 text-slate-600"
                >
                  <span>TechSoup Global Grants</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kobotoolbox.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-700 inline-flex items-center gap-1 text-slate-600"
                >
                  <span>KoboToolbox Field Surveys</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.canva.com/canva-for-nonprofits/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-700 inline-flex items-center gap-1 text-slate-600"
                >
                  <span>Canva Pro for Nonprofits</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy Standards */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Data & Ethics Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• Beneficiary Consent Safeguards</li>
              <li>• Confidential Operational Scoring</li>
              <li>• Child & Vulnerable Person Data Privacy</li>
              <li>• Grant Compliance & Audit Readiness</li>
              <li>• Zero Commercial Data Resale</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>© {new Date().getFullYear()} People4Good. Open Digital Transformation Framework.</span>
          <span className="flex items-center gap-1.5 text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Encrypted & Confidential Assessment</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
