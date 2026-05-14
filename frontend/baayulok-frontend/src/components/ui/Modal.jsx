import Button from './Button';

export default function Modal({ title, onClose, children, footer }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,25,23,0.55)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #E2DDD6',
            position: 'sticky',
            top: 0,
            background: '#FFFFFF',
            zIndex: 1,
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 500 }}>{title}</h3>
          <Button variant="secondary" size="sm" onClick={onClose}>
            ✕ Close
          </Button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
              padding: '16px 24px',
              borderTop: '1px solid #E2DDD6',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}