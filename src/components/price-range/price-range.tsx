import { useCallback, useState } from "react";
import Button from "../button/button";
import { cn, formatPrice, parsePrice, toPersianDigits } from "../../libs/utils";
import Input from "../input/input";

interface PriceRangeProps {
  minLabel?: string
  maxLabel?: string
  applyLabel?: string
  titleLabel?: string
  currencyLabel?: string
  min?: number
  max?: number
  step?: number
  onApply?: (min: number, max: number) => void
  disabled?: boolean
  rtl?: boolean
};
const PriceRange = ({ minLabel = "از",
  maxLabel = "تا",
  applyLabel = "اعمال تغییرات",
  titleLabel = "محدوده قیمت",
  currencyLabel = "تومان",
  min: initialMin = 1000000,
  max: initialMax = 100000000,
  step = 1000,
  onApply,
  disabled = false,
  rtl = true }: PriceRangeProps) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  // keep separate input strings to avoid formatting while typing (prevents caret jumps)
  const [minInput, setMinInput] = useState<string>(formatPrice(initialMin));
  const [maxInput, setMaxInput] = useState<string>(formatPrice(initialMax));

  const handleRangeChange = useCallback(
    (type: "min" | "max", value: number) => {
      if (type === "min") {
        const newMin = Math.min(value, maxValue - step)
        setMinValue(newMin)
        setMinInput(formatPrice(newMin))
      } else {
        const newMax = Math.max(value, minValue + step)
        setMaxValue(newMax)
        setMaxInput(formatPrice(newMax))
      }
    }, [minValue, maxValue]);

  // Handle input typing: update local string only to avoid formatting on every keystroke
  const handleInputTyping = useCallback((type: "min" | "max", value: string) => {
    // convert any latin digits to persian digits as the user types
    const converted = toPersianDigits(value);
    if (type === "min") {
      setMinInput(converted)
    } else {
      setMaxInput(converted)
    }
  }, [])

  // Commit typed value: parse and update numeric state, then format the input
  const handleInputCommit = useCallback((type: "min" | "max", value: string) => {
    const parsed = parsePrice(value)
    if (type === "min") {
      const newMin = Math.min(parsed, maxValue - step)
      setMinValue(newMin)
      setMinInput(formatPrice(newMin))
    } else {
      const newMax = Math.max(parsed, minValue + step)
      setMaxValue(newMax)
      setMaxInput(formatPrice(newMax))
    }
  }, [minValue, maxValue, step])
  const rangeTotalLength = initialMax - initialMin;
  const getTrackStyle = () => {
    const percent1 = ((minValue - initialMin) / (rangeTotalLength)) * 100
    const percent2 = ((maxValue - initialMin) / (rangeTotalLength)) * 100
    return {
      right: `${percent1}%`,
      left: `${100 - percent2}%`,
    }
  }

  const trackStyle = getTrackStyle()
  return (
    <div className="flex flex-col gap-2 p-2 range">
      <div className="relative h-8 ">
        {/* Track background */}
        <div className="absolute w-full h-1 bg-gray-light rounded-full" />

        {/* Active track */}
        <div
          className="absolute top-0.5 h-0.5 bg-primary rounded-full transition-all"
          style={{
            left: trackStyle.left,
            right: trackStyle.right,
          }}
        />
        <input className={cn(
          "absolute  w-full h-1 bg-transparent rounded-full appearance-none pointer-events-none cursor-pointer",
          "slider-thumb-min",
        )}
          style={{
            zIndex: minValue > initialMax - (initialMax - initialMin) / 2 ? 5 : 3,
          }}

          value={minValue} onChange={(e) => handleRangeChange("min", parsePrice(e.target.value))}
          name="min-price" type="range" min={initialMin} max={initialMax} step={step} />
        <input className={cn(
          "absolute w-full h-1 bg-transparent rounded-full appearance-none pointer-events-none cursor-pointer",
          "slider-thumb-max",
        )}
          style={{
            zIndex: 4,
          }}
          value={maxValue} onChange={(e) => handleRangeChange("max", parsePrice(e.target.value))} name="max-price" type="range" min={initialMin} max={initialMax} step={step} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Input type="text" dir="ltr" className="bg-gray-light outline-none"
            value={minInput}
            onChange={(e) => handleInputTyping("min", e.target.value)}
            onBlur={(e) => handleInputCommit("min", e.target.value)}
            disabled={disabled}
            labelRight="از"
            labelLeft="تومان"
            />
        </div>
                 <div className="flex items-center gap-3">
          <Input type="text" dir="ltr" className="bg-gray-light outline-none"
            value={maxInput}
            onChange={(e) => handleInputTyping("max", e.target.value)}
            onBlur={(e) => handleInputCommit("max", e.target.value)}
            disabled={disabled}
            labelRight="تا"
            labelLeft="تومان"
            />
        </div>
      </div>
      <Button variant="gray">اعمال تغییرات</Button>
    </div>
  );
};

export default PriceRange;