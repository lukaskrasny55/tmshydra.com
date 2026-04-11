import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, User, Phone, Mail, MapPin, Trash2, CheckCircle, XCircle } from 'lucide-react';

export const BookingsManager: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await supabase.from('bookings').delete().eq('id', id);
      fetchBookings();
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tight">BOOKINGS</h2>
        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {bookings.length} Total
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                    b.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {b.status}
                  </span>
                  <span className="text-slate-400 text-xs font-bold">
                    ID: {b.id.slice(0, 8)}...
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-900 font-bold">
                      <User className="w-4 h-4 text-blue-500" /> {b.name}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <Phone className="w-4 h-4" /> {b.phone}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm underline">
                      <Mail className="w-4 h-4" /> {b.email}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-900 font-bold">
                      <Calendar className="w-4 h-4 text-blue-500" /> {new Date(b.date).toLocaleDateString('sk-SK')}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <Clock className="w-4 h-4" /> {b.time}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <MapPin className="w-4 h-4" /> {b.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 justify-end">
                <button 
                  onClick={() => updateStatus(b.id, 'confirmed')}
                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                  title="Confirm"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => updateStatus(b.id, 'cancelled')}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  title="Cancel"
                >
                  <XCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => deleteBooking(b.id)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
};
