import React from 'react';
import { MdOpenInNew, MdKeyboardArrowUp } from 'react-icons/md';

interface DecorationRightProps {
    activeItem: string;
    activeCost: string;
    totalCost: string;
}

export default function DecorationRight({ activeItem, activeCost, totalCost }: DecorationRightProps) {
  return (
    <div className="w-full max-w-sm bg-white p-5 rounded-sm font-sans text-xs hidden min-[930px]:block">
      <div className="space-y-1 mb-4">
        <h3 className="text-sm font-normal text-gray-900">Monthly estimate</h3>
        <p className="text-2xl font-normal text-gray-900">{totalCost}</p>
        <p className="text-xs text-gray-700 font-normal">That's about $50.29 hourly</p>
        <p className="text-[11px] text-gray-500 font-normal pt-1">
          Pay for what you use: no upfront costs and per second billing
        </p>
      </div>

      <div className="w-full border border-gray-200 bg-white rounded-sm overflow-hidden mb-4">
        <div className="grid grid-cols-12 px-3 py-1.5 bg-[#f8f9fa] border-b border-gray-200 text-[11px] font-medium text-gray-700">
          <div className="col-span-8 text-left">Item</div>
          <div className="col-span-4 text-right">Monthly estimate</div>
        </div>

        <div className="divide-y divide-gray-200 text-gray-600">
          <div className="grid grid-cols-12 px-3 py-2 bg-blue-50/40 transition-colors duration-300">
            <div className="col-span-8 text-left font-medium text-gray-800 truncate">{activeItem}</div>
            <div className="col-span-4 text-right font-medium text-gray-900">{activeCost}</div>
          </div>
          
          <div className="grid grid-cols-12 px-3 py-2">
            <div className="col-span-8 text-left font-normal">10 GB balanced persistent disk</div>
            <div className="col-span-4 text-right text-gray-800">$1.00</div>
          </div>

          <div className="grid grid-cols-12 px-3 py-2 items-center">
            <div className="col-span-8 text-left text-[#3367d6] hover:underline cursor-pointer">Logging</div>
            <div className="col-span-4 text-right text-[#3367d6] hover:underline cursor-pointer flex items-center justify-end gap-1">
              <span>Cost varies</span>
              <MdOpenInNew size={11} />
            </div>
          </div>

          <div className="grid grid-cols-12 px-3 py-2 items-center">
            <div className="col-span-8 text-left text-[#3367d6] hover:underline cursor-pointer">Monitoring</div>
            <div className="col-span-4 text-right text-[#3367d6] hover:underline cursor-pointer flex items-center justify-end gap-1">
              <span>Cost varies</span>
              <MdOpenInNew size={11} />
            </div>
          </div>
          <div className="grid grid-cols-12 px-3 py-2 bg-[#f8f9fa] font-medium text-gray-900 border-t border-gray-300">
            <div className="col-span-8 text-left">Total</div>
            <div className="col-span-4 text-right">{totalCost}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <div className="text-[#3367d6] hover:underline cursor-pointer flex items-center gap-1 text-[11px] font-medium">
          <span>Compute Engine pricing</span>
          <MdOpenInNew size={12} />
        </div>
        <div className="text-[#3367d6] hover:underline cursor-pointer flex items-center gap-1 text-[11px] font-medium">
          <span>Cloud Operations pricing</span>
          <MdOpenInNew size={12} />
        </div>
        <div className="text-[#3367d6] hover:underline cursor-pointer flex items-center gap-1 text-xs font-medium pt-1">
          <MdKeyboardArrowUp size={16} />
          <span>Less</span>
        </div>
      </div>
    </div>
  );
}