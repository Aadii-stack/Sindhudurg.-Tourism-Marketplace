import React, { useState } from 'react';
import { Send, CheckCircle2, Calendar, Users, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { TourismListing, TourismEnquiry } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../lib/utils';
import { Modal } from '../common/Modal';

interface BookingEnquiryModalProps {
  listing: TourismListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingEnquiryModal: React.FC<BookingEnquiryModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  const { createEnquiry } = useMarketplace();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 ');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<TourismEnquiry | null>(null);

  if (!listing) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiry = await createEnquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        userId: user?.id,
        customerName,
        customerEmail,
        customerPhone,
        preferredDate,
        guestsCount,
        notes
      });
      setSubmittedEnquiry(enquiry);
    } catch (err) {
      console.error('Failed to submit enquiry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedEnquiry(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title={submittedEnquiry ? 'Expedition Request Logged' : `Reserve / Enquire: ${listing.title}`}
      subtitle={submittedEnquiry ? `Reference Ticket #${submittedEnquiry.id}` : `${listing.locationTaluka} Taluka • ${formatINR(listing.priceIndicativeInr)} / ${listing.priceLabel}`}
      maxWidth="lg"
    >
      {submittedEnquiry ? (
        <div className="space-y-5 text-center py-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ocean-950 font-serif">
              Enquiry Received Successfully!
            </h3>
            <p className="text-xs text-slate-500">
              Your request has been logged and assigned to the local provider.
            </p>
          </div>

          {/* Ticket Summary Box */}
          <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-left text-xs space-y-2">
            <div className="flex justify-between pb-2 border-b border-sand-200 text-slate-500">
              <span>Enquiry Ref:</span>
              <span className="font-mono font-bold text-slate-800">{submittedEnquiry.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Experience:</span>
              <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">{listing.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Preferred Date:</span>
              <span className="font-semibold text-slate-900">{preferredDate || 'Flexible / To be confirmed'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Party Size:</span>
              <span className="font-semibold text-slate-900">{guestsCount} Guests</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-sand-200">
              <span className="text-slate-500">Lead Contact:</span>
              <span className="font-semibold text-slate-900">{customerName} ({customerPhone})</span>
            </div>
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl text-teal-950 text-xs text-left flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Expedition dispatch docket successfully transmitted to the certified local guide. Review your active dossier anytime in the <strong>Member Dashboard</strong>.
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="w-full py-2.5 rounded-xl bg-ocean-950 text-sand-50 font-medium text-xs hover:bg-ocean-900 transition-colors"
          >
            Return to Catalogue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>

            {/* Guests Count */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-teal-600" />
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                max={20}
                required
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-teal-600" />
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Rohit Deshmukh"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                WhatsApp / Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 11223"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notes or Special Requirements (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Non-swimmers in group, underwater video camera required, preferred early morning session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 resize-none"
            />
          </div>

          <div className="p-3 bg-sand-100 rounded-xl text-[11px] text-slate-500 flex items-center justify-between">
            <span>Estimated Total:</span>
            <span className="font-bold text-ocean-950 text-sm">
              {formatINR(listing.priceIndicativeInr * guestsCount)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-sand-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-ocean-950 hover:bg-ocean-900 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-mango-400" />
              <span>{isSubmitting ? 'Transmitting...' : 'Transmit Enquiry'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
