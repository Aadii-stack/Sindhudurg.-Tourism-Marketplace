import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldAlert,
  ShoppingBag,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../lib/utils';
import { Order, Taluka } from '../../types';
import { Modal } from '../common/Modal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

const TALUKAS: Taluka[] = [
  'Devgad',
  'Malvan',
  'Sawantwadi',
  'Vengurla',
  'Kudal',
  'Kankavli',
  'Dodamarg',
  'Vaibhavwadi'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { items, subtotalInr, deliveryFeeInr, totalAmountInr, clearCart } = useCart();
  const { createOrder } = useMarketplace();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 ');
  const [shippingAddress, setShippingAddress] = useState('Bunglow No. 4, Malvani Bay, Kurte Beach');
  const [taluka, setTaluka] = useState<Taluka>('Malvan');
  const [pincode, setPincode] = useState('416606');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod_demo' | 'upi_demo'>('cod_demo');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        orderId: '',
        productId: item.product.id,
        productName: item.product.name,
        productPriceInr: item.product.priceInr,
        quantity: item.quantity,
        subtotalInr: item.product.priceInr * item.quantity,
        imageUrl: item.product.imageUrl
      }));

      const newOrder = await createOrder({
        userId: user?.id,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        taluka,
        pincode,
        subtotalInr,
        deliveryFeeInr,
        totalAmountInr,
        paymentMethod: paymentMethod === 'cod_demo' ? 'Cash on Delivery (Demo)' : 'UPI / QR Scan (Demo)',
        notes,
        items: orderItems
      });

      setConfirmedOrder(newOrder);
      clearCart();
      onOrderSuccess(newOrder);
    } catch (err) {
      console.error('Order creation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={confirmedOrder ? 'Order Dispatch Confirmed' : 'Delivery & Consignment Information'}
      subtitle={confirmedOrder ? `Consignment Ref: ${confirmedOrder.orderCode}` : 'Sindhudurg Direct Artisan Dispatch • Standard Regional Delivery'}
      maxWidth="3xl"
    >
      {confirmedOrder ? (
        <div className="space-y-6 py-2">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-ocean-950 font-serif">
              Order Docket Registered
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Consignment instructions have been recorded in the district ledger. The producer cooperative has received your delivery dispatch notice.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="p-5 bg-sand-50 rounded-2xl border border-sand-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-sand-200 text-xs gap-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Consignment Number</span>
                <span className="font-mono font-bold text-base text-ocean-950">{confirmedOrder.orderCode}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Dispatch</span>
                <span className="font-semibold text-teal-800">2-3 Business Days</span>
              </div>
            </div>

            {/* Purchased Items */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Package Contents:</span>
              {confirmedOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between items-center text-slate-600">
                  <span className="truncate max-w-[280px]">
                    {it.quantity}x {it.productName}
                  </span>
                  <span className="font-semibold text-slate-900 font-serif">
                    {formatINR(it.subtotalInr)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Block */}
            <div className="pt-3 border-t border-sand-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>{formatINR(confirmedOrder.subtotalInr)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping:</span>
                <span className="text-teal-700 font-semibold">{confirmedOrder.deliveryFeeInr === 0 ? 'FREE' : formatINR(confirmedOrder.deliveryFeeInr)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-ocean-950 pt-1 font-serif">
                <span>Total Paid:</span>
                <span>{formatINR(confirmedOrder.totalAmountInr)}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="pt-2 text-xs text-slate-500 border-t border-sand-200 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Delivering to: </span>
                {confirmedOrder.customerName}, {confirmedOrder.shippingAddress}, {confirmedOrder.taluka}, PIN: {confirmedOrder.pincode} (Tel: {confirmedOrder.customerPhone})
              </div>
            </div>
          </div>

          {/* Academic Reminder */}
          <div className="p-3.5 bg-sand-100/80 rounded-xl border border-sand-200 text-xs text-slate-700 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-ocean-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Consignment record logged in the local offline database. Review and track dispatch milestones anytime under your <strong>Member Dashboard</strong>.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-sand-100 hover:bg-sand-200 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-ocean-950 hover:bg-ocean-900 transition-colors"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      ) : (
        <form onSubmit={handleCheckoutSubmit} className="space-y-6">
          
          {/* Important Non-Payment Disclaimer Banner */}
          <div className="p-3 bg-ocean-50/80 rounded-xl border border-ocean-200/80 text-xs text-ocean-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-ocean-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Direct Cooperative Consignment:</strong> Payment processing is coordinated directly via regional cooperative delivery or UPI settlement upon dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Contact & Address */}
            <div className="space-y-4">
              <h4 className="font-bold text-ocean-950 text-sm font-serif">
                1. Shipping & Contact Details
              </h4>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohit Deshmukh"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="rohit@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp / Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 11223"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street / Flat / Colony
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment, Street, Landmark"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 resize-none"
                  />
                </div>
              </div>

              {/* Taluka & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Taluka / District
                  </label>
                  <select
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value as Taluka)}
                    className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                  >
                    {TALUKAS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="416606"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                  />
                </div>
              </div>

              {/* Delivery notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Packing / Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Deliver during daytime, extra padding for wooden toys"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                />
              </div>

            </div>

            {/* Right: Payment Method & Order Summary */}
            <div className="space-y-4">
              <h4 className="font-bold text-ocean-950 text-sm font-serif">
                2. Payment Selection & Summary
              </h4>

              {/* Payment selector */}
              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('cod_demo')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod_demo'
                      ? 'bg-ocean-50/70 border-ocean-600 text-ocean-950 font-semibold'
                      : 'bg-sand-50 border-sand-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Truck className="w-4 h-4 text-ocean-700" />
                    <div>
                      <p>Direct Settlement on Delivery / Kisan Direct</p>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Pay upon physical delivery across Maharashtra & Goa
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'cod_demo'}
                    onChange={() => setPaymentMethod('cod_demo')}
                    className="accent-ocean-900"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('upi_demo')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi_demo'
                      ? 'bg-ocean-50/70 border-ocean-600 text-ocean-950 font-semibold'
                      : 'bg-sand-50 border-sand-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <CreditCard className="w-4 h-4 text-teal-700" />
                    <div>
                      <p>Direct UPI / Cooperative Bank Transfer</p>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Direct merchant settlement to artisan cooperative
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'upi_demo'}
                    onChange={() => setPaymentMethod('upi_demo')}
                    className="accent-ocean-900"
                  />
                </label>
              </div>

              {/* Order Items Review */}
              <div className="p-3.5 bg-sand-50/90 rounded-xl border border-sand-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">
                  Items in Order ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
                
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-sand-100">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="pt-1.5 first:pt-0 flex justify-between text-slate-600">
                      <span className="truncate max-w-[190px]">
                        {quantity}x {product.name}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatINR(product.priceInr * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-sand-200 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>{formatINR(subtotalInr)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Doorstep Shipping:</span>
                    <span className="text-teal-700 font-semibold">{deliveryFeeInr === 0 ? 'FREE' : formatINR(deliveryFeeInr)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-ocean-950 text-sm pt-1 border-t border-sand-200 font-serif">
                    <span>Consignment Total:</span>
                    <span>{formatINR(totalAmountInr)}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-ocean-950 hover:bg-ocean-900 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>{isSubmitting ? 'Registering Consignment...' : `Confirm Consignment • ${formatINR(totalAmountInr)}`}</span>
                  <ArrowRight className="w-4 h-4 text-mango-400" />
                </button>
              </div>

            </div>

          </div>

        </form>
      )}
    </Modal>
  );
};
