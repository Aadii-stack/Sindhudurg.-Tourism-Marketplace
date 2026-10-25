import React, { useState, useEffect } from 'react';
import { Plus, Check, MapPin, DollarSign, Package, Image as ImageIcon } from 'lucide-react';
import { Product, ProductCategory, Taluka } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';

interface AddEditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
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

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { categories, sellers, addProduct, updateProduct } = useMarketplace();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceInr, setPriceInr] = useState<number>(500);
  const [mrpInr, setMrpInr] = useState<number>(650);
  const [unit, setUnit] = useState('1 Box');
  const [stockQuantity, setStockQuantity] = useState<number>(50);
  const [originTaluka, setOriginTaluka] = useState<Taluka>('Devgad');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [sellerId, setSellerId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategoryId(product.categoryId);
      setPriceInr(product.priceInr);
      setMrpInr(product.mrpInr || product.priceInr);
      setUnit(product.unit);
      setStockQuantity(product.stockQuantity);
      setOriginTaluka(product.originTaluka);
      setImageUrl(product.imageUrl);
      setDescription(product.description);
      setIsOrganic(Boolean(product.isOrganic));
      setIsFeatured(Boolean(product.isFeatured));
      setIsActive(product.isActive);
      setSellerId(product.sellerId);
    } else {
      // Default new product values
      setName('');
      setCategoryId(categories[0]?.id || 'c1');
      setPriceInr(450);
      setMrpInr(550);
      setUnit('500g Pack');
      setStockQuantity(30);
      setOriginTaluka('Devgad');
      setImageUrl('https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80');
      setDescription('Fresh authentic regional produce harvested from coastal Konkan red laterite soil.');
      setIsOrganic(true);
      setIsFeatured(false);
      setIsActive(true);
      setSellerId(sellers[0]?.id || 's1');
    }
  }, [product, categories, sellers, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const selectedCategory = categories.find((c) => c.id === categoryId);
    const selectedSeller = sellers.find((s) => s.id === sellerId);

    try {
      if (product) {
        await updateProduct(product.id, {
          name,
          slug,
          categoryId,
          categoryName: selectedCategory?.name,
          priceInr,
          mrpInr,
          unit,
          stockQuantity,
          originTaluka,
          imageUrl,
          description,
          isOrganic,
          isFeatured,
          isActive
        });
      } else {
        await addProduct({
          name,
          slug,
          sellerId: sellerId || sellers[0]?.id || 's1',
          sellerName: selectedSeller?.businessName || 'Sindhudurg Cooperative',
          categoryId: categoryId || categories[0]?.id || 'c1',
          categoryName: selectedCategory?.name || 'Local Products',
          priceInr,
          mrpInr,
          unit,
          stockQuantity,
          originTaluka,
          imageUrl,
          description,
          isOrganic,
          isFeatured,
          isActive
        });
      }
      onClose();
    } catch (err) {
      console.error('Failed to save product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Marketplace Listing' : 'List New Konkan Product'}
      subtitle="Publish verified farm produce or handcrafted artisan goods"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Product Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Product Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 100% Pure Organic Kokum Concentrate"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
          />
        </div>

        {/* Category & Origin Taluka */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Origin Taluka
            </label>
            <select
              value={originTaluka}
              onChange={(e) => setOriginTaluka(e.target.value as Taluka)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            >
              {TALUKAS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price, MRP, Unit & Stock */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Selling Price (₹)
            </label>
            <input
              type="number"
              min={1}
              required
              value={priceInr}
              onChange={(e) => setPriceInr(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              MRP (₹)
            </label>
            <input
              type="number"
              min={1}
              value={mrpInr}
              onChange={(e) => setMrpInr(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Unit Specification
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1 Dozen, 500g"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              min={0}
              required
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            Image URL (Direct link)
          </label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Authentic Description & Heritage Notes
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describe provenance, harvest method, or traditional crafting technique..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 resize-none"
          />
        </div>

        {/* Flags: Organic, Featured, Active */}
        <div className="flex flex-wrap items-center gap-6 p-3 bg-sand-50 rounded-xl border border-sand-200">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="w-4 h-4 rounded text-teal-600 accent-teal-600"
            />
            <span>100% Chemical-free / Organic</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-mango-600 accent-mango-600"
            />
            <span>Featured on Home Page</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-ocean-900 accent-ocean-900"
            />
            <span>Active in Marketplace</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-sand-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-sand-100 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl bg-ocean-900 hover:bg-ocean-800 text-white font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4 text-mango-400" />
            <span>{isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
