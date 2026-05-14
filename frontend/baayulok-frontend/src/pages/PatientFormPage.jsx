import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import PatientForm from '../components/patients/PatientForm';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';

export default function PatientFormPage() {
  const { id } = useParams(); // undefined on /patients/new
  const isEdit = Boolean(id);
  const { fetchOne, create, update } = usePatients();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    fetchOne(id).then((data) => {
      setInitial(data);
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(data) {
    if (isEdit) {
      await update(id, data);
    } else {
      await create(data);
    }
    navigate('/patients');
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Button variant="secondary" size="sm" onClick={() => navigate('/patients')}>
          ← Back
        </Button>
        <h1 style={{ fontSize: '26px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
          {isEdit ? 'Edit patient' : 'New patient'}
        </h1>
      </div>

      {loading && <Spinner />}

      {!loading && (
        <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', padding: '28px', maxWidth: '700px' }}>
          <PatientForm
            initial={initial || {}}
            isEdit={isEdit}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/patients')}
          />
        </div>
      )}
    </div>
  );
}