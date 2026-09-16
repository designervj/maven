'use client';
import { useAppSelector } from '@/redux/hooks';
import { setEditMode } from '@/redux/slices/pages/pagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { EyeOff, LayoutDashboard, MessageSquare, PanelTop, Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

const ADMIN_BAR_HEIGHT = '46px';
const KALP_ADMIN_URL = process.env.NEXT_PUBLIC_KALP_ADMIN_URL || 'http://localhost:5177';

export default function EditModeToggle() {
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);
  const [isHidden, setIsHidden] = useState(false);

  const {authUser ,isAuthenticated}= useSelector((state:RootState)=>state.auth)
  const shouldShowAdminBar = Boolean(authUser && authUser?.role === "tenant_admin" && !isHidden);

  useEffect(() => {
    document.documentElement.style.setProperty('--admin-bar-offset', shouldShowAdminBar ? ADMIN_BAR_HEIGHT : '0px');

    return () => {
      document.documentElement.style.setProperty('--admin-bar-offset', '0px');
    };
  }, [shouldShowAdminBar]);

  const handleEdit=()=>{
    if(authUser?.role !== "tenant_admin" || !isAuthenticated){
        alert("You are not authorized to edit this page")
        return
    }
    dispatch(setEditMode(!isEditable))
  }
  if (!authUser || authUser?.role !== "tenant_admin") return null;

  if (isHidden) {
    return (
      <button
        type="button"
        onClick={() => setIsHidden(false)}
        className="fixed right-4 top-4 z-[100] inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-[#063b1c] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-50 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition hover:bg-[#0a4a24]"
        title="Show admin bar"
      >
        <PanelTop size={14} strokeWidth={2} />
        Admin
      </button>
    );
  }

  return (
    <>
    <div className="fixed inset-x-0 top-0 z-[100] border-b border-emerald-300/25 bg-[#063b1c] text-emerald-50 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <div className="flex h-[46px] items-center justify-between gap-3 px-3 sm:px-4">
        <a
          href={KALP_ADMIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-w-0 items-center gap-2 rounded-full px-1 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] transition hover:text-white"
        >
          <LayoutDashboard size={15} strokeWidth={2.4} className="text-lime-400" />
          <span className="hidden sm:inline">Admin Dashboard</span>
          <span className="sm:hidden">Admin</span>
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/5 px-3 py-2 text-[11px] font-bold text-emerald-100 transition hover:border-emerald-200/35 hover:bg-white/10"
            title="Show comments"
          >
            <MessageSquare size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Show Comments (2)</span>
            <span className="sm:hidden">Comments</span>
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-bold transition ${
              isEditable
                ? 'border-lime-300/70 bg-lime-300 text-[#063b1c] shadow-[0_0_18px_rgba(190,242,100,0.35)]'
                : 'border-emerald-200/20 bg-white/5 text-emerald-100 hover:border-emerald-200/35 hover:bg-white/10'
            }`}
            title={isEditable ? 'Disable edit mode' : 'Enable edit mode'}
          >
            <Pencil size={14} strokeWidth={2} />
            <span>{isEditable ? 'Edit Mode ON' : 'Edit Mode OFF'}</span>
          </button>

          <div className="hidden h-6 w-px bg-emerald-200/20 sm:block" />

          <button
            type="button"
            onClick={() => setIsHidden(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-emerald-100 transition hover:bg-white/10 hover:text-white"
            title="Hide admin bar"
          >
            <EyeOff size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
    <div aria-hidden="true" className="h-[46px]" />
    </>
  );
}
