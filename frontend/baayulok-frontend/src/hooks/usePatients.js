import { useState, useCallback } from 'react';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  updatePatientStatus,
  getPatientDocuments,
  createPatientDocument,
  getPatientDonations,
  createDonation,
} from '../api/patients';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOne = useCallback(async (id) => {
    try {
      return await getPatientById(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const create = useCallback(async (data) => {
    const result = await createPatient(data);
    await fetchAll(); // refresh list
    return result;
  }, [fetchAll]);

  const update = useCallback(async (id, data) => {
    const result = await updatePatient(id, data);
    await fetchAll();
    return result;
  }, [fetchAll]);

  const updateStatus = useCallback(async (id, status) => {
    const result = await updatePatientStatus(id, status);
    // Optimistically update local list
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    return result;
  }, []);

  // ─── Documents ──────────────────────────────────────────────

  const fetchDocuments = useCallback(async (patientId) => {
    try {
      return await getPatientDocuments(patientId);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const addDocument = useCallback(async (patientId, data) => {
    return createPatientDocument(patientId, data);
  }, []);

  // ─── Donations ──────────────────────────────────────────────

  const fetchDonations = useCallback(async (patientId) => {
    try {
      return await getPatientDonations(patientId);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const addDonation = useCallback(async (patientId, data) => {
    return createDonation(patientId, data);
  }, []);

  return {
    patients,
    loading,
    error,
    fetchAll,
    fetchOne,
    create,
    update,
    updateStatus,
    fetchDocuments,
    addDocument,
    fetchDonations,
    addDonation,
  };
}