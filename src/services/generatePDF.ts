import api from './api';

export default async function generatePDF(id: string): Promise<void> {
  const token = localStorage.getItem('@JRMCompensados:token');

  const PDFCreatedInBlob = await api.post(
    `/orderpdf/${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
      responseType: 'blob',
    },
  );

  const file = new Blob([PDFCreatedInBlob.data], {
    type: 'application/pdf',
  });

  const fileURL = URL.createObjectURL(file);

  window.open(fileURL);
}
