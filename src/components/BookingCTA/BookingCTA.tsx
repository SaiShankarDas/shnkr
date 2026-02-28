import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countryCodes, getFlagEmoji, type CountryCode } from '../../data/countryCodes';

// --------------- helpers ---------------
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TIME_SLOTS = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};

const isPast = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
};


type Step = 'date' | 'time' | 'details' | 'done';

// --------------- Country Code Selector ---------------
const CountryCodeSelector: React.FC<{
    selected: CountryCode;
    onSelect: (c: CountryCode) => void;
}> = ({ selected, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (open && searchRef.current) searchRef.current.focus();
    }, [open]);

    const filtered = useMemo(() =>
        search
            ? countryCodes.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.dial_code.includes(search)
            )
            : countryCodes
        , [search]);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 h-[46px] px-3 rounded-l-lg bg-white/[0.05] border border-white/[0.06] border-r-0 text-sm text-white/70 hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
            >
                <span className="text-base leading-none">{getFlagEmoji(selected.code)}</span>
                <span className="text-white/50 text-xs">{selected.dial_code}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-white/30 transition-transform ${open ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-1 w-64 max-h-60 bg-[#111] border border-white/[0.08] rounded-lg overflow-hidden z-50 shadow-2xl"
                    >
                        {/* Search */}
                        <div className="p-2 border-b border-white/[0.06]">
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search country..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-white placeholder:text-white/20 outline-none focus:border-accent/40"
                            />
                        </div>

                        {/* List */}
                        <div className="max-h-48 overflow-y-auto">
                            {filtered.map((c) => (
                                <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => { onSelect(c); setOpen(false); setSearch(''); }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-white/[0.06] transition-colors cursor-pointer ${selected.code === c.code ? 'bg-accent/10' : ''
                                        }`}
                                >
                                    <span className="text-base leading-none">{getFlagEmoji(c.code)}</span>
                                    <span className="text-xs text-white/60 truncate flex-1">{c.name}</span>
                                    <span className="text-[11px] text-white/30">{c.dial_code}</span>
                                </button>
                            ))}
                            {filtered.length === 0 && (
                                <div className="px-3 py-4 text-xs text-white/20 text-center">No results</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --------------- Calendar Grid ---------------
const CalendarGrid: React.FC<{ selected: Date | null; onSelect: (d: Date) => void }> = ({ selected, onSelect }) => {
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [viewYear, setViewYear] = useState(new Date().getFullYear());

    const days = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const cells: (Date | null)[] = [];
        for (let i = 0; i < firstDay; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));
        return cells;
    }, [viewMonth, viewYear]);

    const prev = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const next = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const canGoPrev = viewYear > new Date().getFullYear() || (viewYear === new Date().getFullYear() && viewMonth > new Date().getMonth());

    return (
        <div>
            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
                <button onClick={prev} disabled={!canGoPrev} className="text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <span className="text-sm text-white/70 uppercase tracking-wider">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                <button onClick={next} className="text-white/30 hover:text-white transition-colors p-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_LABELS.map(d => (
                    <div key={d} className="text-center text-[10px] text-white/20 uppercase tracking-wider py-1">{d}</div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                    if (!day) return <div key={`e-${i}`} />;
                    const disabled = isPast(day);
                    const isSelected = selected && day.toDateString() === selected.toDateString();
                    const today = isToday(day);

                    return (
                        <button
                            key={i}
                            disabled={disabled}
                            onClick={() => onSelect(day)}
                            className={`
                                relative h-9 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
                                ${disabled ? 'text-white/10 cursor-not-allowed' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'}
                                ${isSelected ? 'bg-accent text-white hover:bg-accent' : ''}
                                ${today && !isSelected ? 'ring-1 ring-accent/40' : ''}
                            `}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// --------------- Main Component ---------------
export const BookingCTA: React.FC = () => {
    const [step, setStep] = useState<Step>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]); // India
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [phoneError, setPhoneError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Auto-reset booking form 10s after confirmation
    useEffect(() => {
        if (step !== 'done') return;
        const timer = setTimeout(() => {
            setStep('date');
            setSelectedDate(null);
            setSelectedTime(null);
            setForm({ name: '', email: '', phone: '' });
            setPhoneError('');
            setSelectedCountry(countryCodes[0]);
        }, 10000);
        return () => clearTimeout(timer);
    }, [step]);

    const handleDateSelect = (d: Date) => {
        setSelectedDate(d);
        setStep('time');
    };

    const handleTimeSelect = (t: string) => {
        setSelectedTime(t);
        setStep('details');
    };

    const handlePhoneChange = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 10);
        setForm(f => ({ ...f, phone: digits }));
        if (phoneError) setPhoneError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone) return;
        if (form.phone.length !== 10) {
            setPhoneError('Please enter a valid 10-digit phone number');
            return;
        }
        setPhoneError('');
        setSubmitting(true);

        const bookingData = {
            date: selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            time: selectedTime,
            name: form.name,
            email: form.email,
            phone: `${selectedCountry.dial_code} ${form.phone}`,
            timestamp: new Date().toISOString(),
        };

        try {
            const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzNFBuI8GzUlL7o6GLgfxJxYf9rivItzuBzr2ygMnSKIQO3F0X3TOXU5rQhB6rMLt3X/exec';
            await fetch(SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });
            setStep('done');
        } catch (err) {
            console.error('Booking submission failed:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatSelectedDate = (d: Date) =>
        d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    const slideVariants = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <section className="py-20 md:py-28 px-4 md:px-12 bg-background border-t border-white/[0.04]">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32"
                    >
                        <p className="text-accent uppercase tracking-widest text-xs md:text-sm mb-3">Let's Connect</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Book a free<br />
                            <span className="text-white/30">discovery call.</span>
                        </h2>
                        <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-md mb-8">
                            15 minutes. No pitch, no pressure. Just a conversation about your
                            project, your goals, and how I can help bring your vision to life.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://www.instagram.com/shnkr.dev.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white/60 text-sm uppercase tracking-wider rounded-full hover:border-white/25 hover:text-white transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                Or DM me
                            </a>
                        </div>
                    </motion.div>

                    {/* Right — Booking Calendar Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 overflow-hidden">
                            {/* Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />

                            {/* Step indicator */}
                            <div className="flex items-center gap-2 mb-6">
                                {['date', 'time', 'details'].map((s, i) => (
                                    <div key={s} className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors duration-300 ${step === s ? 'bg-accent text-white' :
                                            (['date', 'time', 'details'].indexOf(step) > i || step === 'done') ? 'bg-accent/20 text-accent' :
                                                'bg-white/[0.06] text-white/20'
                                            }`}>
                                            {(['date', 'time', 'details'].indexOf(step) > i || step === 'done') ? '✓' : i + 1}
                                        </div>
                                        {i < 2 && <div className={`w-8 h-px transition-colors duration-300 ${(['date', 'time', 'details'].indexOf(step) > i || step === 'done') ? 'bg-accent/30' : 'bg-white/[0.06]'
                                            }`} />}
                                    </div>
                                ))}
                            </div>

                            {/* Content */}
                            <AnimatePresence mode="wait">
                                {/* Step 1: Calendar */}
                                {step === 'date' && (
                                    <motion.div key="date" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                        <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Select a date</p>
                                        <CalendarGrid selected={selectedDate} onSelect={handleDateSelect} />
                                    </motion.div>
                                )}

                                {/* Step 2: Time Slots */}
                                {step === 'time' && (
                                    <motion.div key="time" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs text-white/30 uppercase tracking-widest">
                                                {selectedDate && formatSelectedDate(selectedDate)} — Pick a time
                                            </p>
                                            <button onClick={() => setStep('date')} className="text-[10px] text-accent uppercase tracking-wider hover:underline cursor-pointer">
                                                Change date
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-[340px] overflow-y-auto pr-1">
                                            {TIME_SLOTS.map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => handleTimeSelect(t)}
                                                    className={`py-2.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${selectedTime === t
                                                        ? 'bg-accent text-white'
                                                        : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white border border-white/[0.04]'
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Contact Details */}
                                {step === 'details' && (
                                    <motion.div key="details" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs text-white/30 uppercase tracking-widest">
                                                Your details
                                            </p>
                                            <button onClick={() => setStep('time')} className="text-[10px] text-accent uppercase tracking-wider hover:underline cursor-pointer">
                                                Change time
                                            </button>
                                        </div>

                                        {/* Selected summary */}
                                        <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/70">{selectedDate && formatSelectedDate(selectedDate)}</p>
                                                <p className="text-xs text-white/30">{selectedTime} IST</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="First name"
                                                value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 transition-colors"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                value={form.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 transition-colors"
                                            />

                                            {/* Phone with country code */}
                                            <div>
                                                <div className="flex items-stretch">
                                                    <CountryCodeSelector
                                                        selected={selectedCountry}
                                                        onSelect={setSelectedCountry}
                                                    />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone number"
                                                        value={form.phone}
                                                        onChange={e => handlePhoneChange(e.target.value)}
                                                        maxLength={10}
                                                        required
                                                        className={`flex-1 px-4 h-[46px] rounded-r-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 transition-colors ${phoneError ? 'border-red-500/60' : ''
                                                            }`}
                                                    />
                                                </div>
                                                {phoneError && (
                                                    <p className="text-red-400 text-[11px] mt-1.5 ml-1">{phoneError}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full py-3.5 bg-accent text-white text-sm font-medium uppercase tracking-wider rounded-lg hover:shadow-[0_0_30px_rgba(242,84,15,0.25)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                                            >
                                                {submitting ? 'Booking...' : 'Book Discovery Call'}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Step 4: Done */}
                                {step === 'done' && (
                                    <motion.div key="done" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">You're booked!</h3>
                                        <p className="text-sm text-white/40 max-w-xs mx-auto">
                                            I'll send you a confirmation email shortly. Looking forward to our conversation!
                                        </p>
                                        <p className="text-xs text-white/20 mt-4">
                                            {selectedDate && formatSelectedDate(selectedDate)} at {selectedTime} IST
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
