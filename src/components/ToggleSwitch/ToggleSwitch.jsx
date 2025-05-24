import './ToggleSwitch.css';

export default function ToggleSwitch({ isChecked, onToggle }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isChecked}
        onChange={onToggle}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          !isChecked ? 'toggle-switch__text_active' : ''
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          isChecked ? 'toggle-switch__text_active' : ''
        }`}
      >
        C
      </span>
    </label>
  );
}
