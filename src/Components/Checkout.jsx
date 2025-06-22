import React, { useState } from 'react';

const Checkout = ({ cartItems, total }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ძალიან მარტივი ვალიდაცია
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'სახელის შეყვანა აუცილებელია';
    if (!formData.lastName.trim()) newErrors.lastName = 'გვარის შეყვანა აუცილებელია';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'ვრცელდება სწორი მეილი';
    if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) newErrors.cardNumber = 'შეიყვანეთ 16-ნიშნა ბარათის ნომერი';
    if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)) newErrors.expiryDate = 'ვადა ფორმატი: MM/YY';
    if (!formData.cvv.trim() || !/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'შეიყვანეთ 3 ან 4 რიცხვიანი CVV';
    if (!formData.cardType.trim()) newErrors.cardType = 'აირჩიეთ ბარათის ტიპი';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // აქ შეგიძლია გადახდის ლოჯიკის დამატება (API ზარი, firebase, stripe და ა.შ)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-20 pb-16 px-6 max-w-3xl mx-auto font-sans text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-6">გადახდა წარმატებით შესრულდა!</h2>
        <p className="text-lg text-center max-w-md">
          მადლობას გიხდით შეძენისთვის. თქვენი შეკვეთა მიღებულია და დამუშავდება მალე.
        </p>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto font-sans text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-green-700 dark:text-green-400 tracking-tight drop-shadow-md">
        გადახდის გვერდი
      </h1>

      {/* შეკვეთის მიმოხილვა */}
      <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">თქვენი შეკვეთა</h2>
        <ul className="divide-y divide-gray-300 dark:divide-gray-600 max-h-64 overflow-y-auto">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between py-3">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">რაოდენობა: {item.quantity}</p>
              </div>
              <span className="font-semibold text-green-700 dark:text-green-400">
                ₾{(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4 text-right">
          <span className="text-xl font-extrabold text-green-800 dark:text-green-300">ჯამი: ₾{total}</span>
        </div>
      </div>

      {/* გადახდის ფორმა */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto"
        noValidate
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">გადახდის ინფორმაცია</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* სახელი */}
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              სახელი
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.firstName
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            />
            {errors.firstName && <p className="text-red-500 mt-1 text-sm">{errors.firstName}</p>}
          </div>

          {/* გვარი */}
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              გვარი
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.lastName
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            />
            {errors.lastName && <p className="text-red-500 mt-1 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        {/* მეილი */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            ელ-ფოსტა
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
              errors.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            required
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* ბარათის ტიპი */}
          <div>
            <label htmlFor="cardType" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              ბარათის ტიპი
            </label>
            <select
              id="cardType"
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.cardType
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            >
              <option value="">აირჩიეთ ბარათის ტიპი</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
            {errors.cardType && <p className="text-red-500 mt-1 text-sm">{errors.cardType}</p>}
          </div>

          {/* ბარათის ნომერი */}
          <div>
            <label htmlFor="cardNumber" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              ბარათის ნომერი
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.cardNumber
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            />
            {errors.cardNumber && <p className="text-red-500 mt-1 text-sm">{errors.cardNumber}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* ვადის মেয়ादის შეყვანა */}
          <div>
            <label htmlFor="expiryDate" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              ვადის ბოლო MM/YY
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.expiryDate
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            />
            {errors.expiryDate && <p className="text-red-500 mt-1 text-sm">{errors.expiryDate}</p>}
          </div>

          {/* CVV */}
          <div>
            <label htmlFor="cvv" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              maxLength="4"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-4 ${
                errors.cvv
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-green-400'
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              required
            />
            {errors.cvv && <p className="text-red-500 mt-1 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        >
          გადაიხადე ₾{total}
        </button>
      </form>
    </section>
  );
};

export default Checkout;
