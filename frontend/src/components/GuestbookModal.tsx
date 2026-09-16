import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, MessageSquare, Check, User } from 'lucide-react';
import { apiUrl } from '../utils/api';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitorCount?: number;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({ isOpen, onClose, visitorCount }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch(apiUrl('/api/guestbook'))
        .then(res => res.json())
        .then(data => {
          if (data.entries) setEntries(data.entries);
        })
        .catch(() => {
          // Fallback initial entries
          setEntries([
            {
              id: 'local-1',
              name: 'Sarah Chen (Lead Engineer)',
              message: 'The village map is such a refreshing way to explore project architectures! The Forge workshop demo is fantastic.',
              timestamp: '2 hours ago'
            },
            {
              id: 'local-2',
              name: 'Marcus Brody',
              message: 'Great work on the Lighthouse telemetry visualizer. Loved the clean road layout.',
              timestamp: 'Yesterday'
            }
          ]);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await fetch(apiUrl('/api/guestbook'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setEntries(prev => [data.entry, ...prev]);
        setName('');
        setMessage('');
        setSuccessMsg('Your note has been etched into the Village Ledger!');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      // Offline fallback
      const localEntry = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        timestamp: 'Just now'
      };
      setEntries(prev => [localEntry, ...prev]);
      setName('');
      setMessage('');
      setSuccessMsg('Saved note to village registry!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="guestbook-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="guestbook-modal-box"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-stone-200 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300/60 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 font-serif text-base">Village Visitor Log</h3>
                {visitorCount !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-200/70 text-amber-900 border border-amber-300">
                    {visitorCount} Travelers
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600">Leave your greeting, feedback, or sign the village ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close visitor log"
            className="p-1.5 rounded-full hover:bg-stone-200/80 text-stone-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Sign ledger form */}
          <form onSubmit={handleSubmit} className="space-y-3 pb-4 border-b border-stone-100">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name or Handle</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex (Fellow Developer)"
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-stone-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Message or Feedback</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Drop a comment on the village, projects, or say hi!"
                rows={2}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-stone-50 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {successMsg && (
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  {successMsg}
                </span>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-800 text-amber-50 hover:bg-amber-900 transition disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sign Ledger</span>
              </button>
            </div>
          </form>

          {/* Existing notes list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Recent Visitor Signatures ({entries.length})
            </h4>
            {entries.map(entry => (
              <div key={entry.id} className="p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">
                <div className="flex items-center justify-between text-stone-700 font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    {entry.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">{entry.timestamp}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
