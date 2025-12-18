import Checkbox from "./checkbox.jsx";

const KEYSET_OPTIONS = [
  { id: "arrows", label: "Arrows" },
  { id: "dev", label: "Dev Mode" },
  { id: "devNoShift", label: "DevNoShift" },
];

export default function KeysetFilterGroup({ value = [], onChange }) {
  const toggleKeyset = (keysetId) => {
    const nextValue = value.includes(keysetId)
      ? value.filter((id) => id !== keysetId)
      : [...value, keysetId];
    onChange(nextValue);
  };

  return (
    <div className="flex flex-col gap-4">
      {KEYSET_OPTIONS.map((keyset) => (
        <Checkbox
          key={keyset.id}
          id={keyset.id}
          label={keyset.label}
          checked={value.includes(keyset.id)}
          onChange={() => toggleKeyset(keyset.id)}
        />
      ))}
    </div>
  );
}
