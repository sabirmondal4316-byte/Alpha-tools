import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles, Moon, Sun, Award } from 'lucide-react';

interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: string;
}

type AgeDetails =
  | { isFuture: true }
  | {
      isFuture: false;
      years: number;
      months: number;
      days: number;
      seconds: number;
      totalMonths: number;
      totalWeeks: number;
      totalDays: number;
      totalHours: number;
      totalMinutes: number;
      totalSeconds: number;
      daysToNextBday: number;
      nextBdayDayOfWeek: string;
      turningAge: number;
      westernZodiac: ZodiacInfo;
      chineseZodiac: string;
      generation: string;
      estimatedHeartbeats: number;
      estimatedBreaths: number;
    };

export const AgeCalculator: React.FC = () => {
  const [birthDateStr, setBirthDateStr] = useState<string>('2000-01-01');
  const [targetDateStr, setTargetDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Ticking seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateAgeDetails = (): AgeDetails | null => {
    const birth = new Date(birthDateStr);
    const target = new Date(targetDateStr);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      return null;
    }

    if (birth > target) {
      return { isFuture: true };
    }

    // Precise Years, Months, Days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total units
    const diffMs = target.getTime() - birth.getTime() + (currentTime.getSeconds() * 1000);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    // Next birthday calculation
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const diffToNextBday = nextBday.getTime() - target.getTime();
    const daysToNextBday = Math.ceil(diffToNextBday / (1000 * 60 * 60 * 24));
    const nextBdayDayOfWeek = nextBday.toLocaleDateString('en-US', { weekday: 'long' });
    const turningAge = years + 1;

    // Western Zodiac
    const getWesternZodiac = (m: number, d: number): ZodiacInfo => {
      // m is 0-indexed
      if ((m === 2 && d >= 21) || (m === 3 && d <= 19)) return { sign: 'Aries', symbol: '♈', element: 'Fire' };
      if ((m === 3 && d >= 20) || (m === 4 && d <= 20)) return { sign: 'Taurus', symbol: '♉', element: 'Earth' };
      if ((m === 4 && d >= 21) || (m === 5 && d <= 20)) return { sign: 'Gemini', symbol: '♊', element: 'Air' };
      if ((m === 5 && d >= 21) || (m === 6 && d <= 22)) return { sign: 'Cancer', symbol: '♋', element: 'Water' };
      if ((m === 6 && d >= 23) || (m === 7 && d <= 22)) return { sign: 'Leo', symbol: '♌', element: 'Fire' };
      if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return { sign: 'Virgo', symbol: '♍', element: 'Earth' };
      if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return { sign: 'Libra', symbol: '♎', element: 'Air' };
      if ((m === 9 && d >= 23) || (m === 10 && d <= 21)) return { sign: 'Scorpio', symbol: '♏', element: 'Water' };
      if ((m === 10 && d >= 22) || (m === 11 && d <= 21)) return { sign: 'Sagittarius', symbol: '♐', element: 'Fire' };
      if ((m === 11 && d >= 22) || (m === 0 && d <= 19)) return { sign: 'Capricorn', symbol: '♑', element: 'Earth' };
      if ((m === 0 && d >= 20) || (m === 1 && d <= 18)) return { sign: 'Aquarius', symbol: '♒', element: 'Air' };
      return { sign: 'Pisces', symbol: '♓', element: 'Water' };
    };

    const westernZodiac = getWesternZodiac(birth.getMonth(), birth.getDate());

    // Chinese Zodiac
    const chineseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const birthYear = birth.getFullYear();
    const chineseZodiac = chineseAnimals[(birthYear - 4) % 12];

    // Generation
    let generation = 'Generation';
    if (birthYear >= 2013) generation = 'Gen Alpha (2013+)';
    else if (birthYear >= 1997) generation = 'Gen Z (1997–2012)';
    else if (birthYear >= 1981) generation = 'Millennial (1981–1996)';
    else if (birthYear >= 1965) generation = 'Gen X (1965–1980)';
    else if (birthYear >= 1946) generation = 'Baby Boomer (1946–1964)';
    else generation = 'Silent Generation';

    // Biological stats
    const estimatedHeartbeats = totalMinutes * 80;
    const estimatedBreaths = totalMinutes * 16;

    return {
      isFuture: false,
      years,
      months,
      days,
      seconds: currentTime.getSeconds(),
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBday,
      nextBdayDayOfWeek,
      turningAge,
      westernZodiac,
      chineseZodiac,
      generation,
      estimatedHeartbeats,
      estimatedBreaths,
    };
  };

  const details = calculateAgeDetails();

  return (
    <div className="space-y-6">
      {/* Date Pickers Card */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Select Birth Date & Comparison Target
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDateStr}
              onChange={(e) => setBirthDateStr(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Calculate Age As Of
            </label>
            <input
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Results */}
      {details && !details.isFuture ? (
        <div className="space-y-6">
          {/* Hero Age Result */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl shadow-blue-500/10 space-y-4">
            <div className="text-xs uppercase font-bold tracking-wider text-blue-200">
              Your Chronological Age
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums">
                  {details.years}
                </span>
                <span className="block text-xs font-medium text-blue-100 mt-1 uppercase tracking-wider">
                  Years
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums">
                  {details.months}
                </span>
                <span className="block text-xs font-medium text-blue-100 mt-1 uppercase tracking-wider">
                  Months
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums">
                  {details.days}
                </span>
                <span className="block text-xs font-medium text-blue-100 mt-1 uppercase tracking-wider">
                  Days
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-blue-100 font-mono">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>
                Real-time exact second ticking:{' '}
                <strong className="text-white font-bold">{details.totalSeconds.toLocaleString()}</strong> seconds of life
              </span>
            </div>
          </div>

          {/* Next Birthday & Lifetime Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next Birthday Card */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Next Birthday Countdown
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  Turning {details.turningAge}
                </span>
              </div>

              <div className="text-center py-4">
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                  {details.daysToNextBday}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Days Remaining until your next birthday
                </span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">
                  It falls on a <strong className="text-purple-600 dark:text-purple-400">{details.nextBdayDayOfWeek}</strong>
                </p>
              </div>
            </div>

            {/* Total Life Units Card */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Life Units Lived
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono tabular-nums">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Total Months</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{details.totalMonths.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Total Weeks</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{details.totalWeeks.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Total Days</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{details.totalDays.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Total Hours</span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{details.totalHours.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Insights Strip: Zodiac, Generation, Biology */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Zodiac Sign</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {details.westernZodiac.symbol} {details.westernZodiac.sign}
              </span>
              <span className="text-xs text-slate-500">{details.westernZodiac.element} Element</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Chinese Zodiac</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">
                Year of the {details.chineseZodiac}
              </span>
              <span className="text-xs text-slate-500">Lunar Calendar</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Generation</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block truncate">
                {details.generation}
              </span>
              <span className="text-xs text-slate-500">Cohort Group</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Heartbeats</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400 font-mono tabular-nums mt-1 block">
                ~{(details.estimatedHeartbeats / 1000000).toFixed(1)}M
              </span>
              <span className="text-xs text-slate-500">~80 beats/min</span>
            </div>
          </div>
        </div>
      ) : details?.isFuture ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-amber-600">
          <p className="font-semibold text-sm">The birth date entered is in the future relative to the comparison date.</p>
          <p className="text-xs text-slate-500 mt-1">Please choose a valid birth date on or before the comparison date.</p>
        </div>
      ) : null}
    </div>
  );
};
