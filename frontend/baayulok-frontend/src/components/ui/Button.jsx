const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '10px 18px',
    borderRadius: '6px',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },
  primary: {
    background: '#1D9E75',
    color: '#fff',
  },
  secondary: {
    background: '#FFFFFF',
    color: '#1A1917',
    border: '1px solid #E2DDD6',
  },
  danger: {
    background: '#FCEBEB',
    color: '#E24B4A',
  },
  sm: {
    padding: '6px 12px',
    fontSize: '12.5px',
  },
  full: {
    width: '100%',
    justifyContent: 'center',
    padding: '12px',
    fontSize: '14px',
  },
};

export default function Button({
  children,
  variant = 'primary',
  size,
  full,
  disabled,
  onClick,
  type = 'button',
  style: extraStyle = {},
}) {
  const combined = {
    ...styles.base,
    ...styles[variant],
    ...(size === 'sm' ? styles.sm : {}),
    ...(full ? styles.full : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
    ...extraStyle,
  };

  return (
    <button type={type} style={combined} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}