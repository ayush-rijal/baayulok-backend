namespace BaayuLok.Application.DTOs.PatientDocuments;

public class CreatePatientDocumentRequest
{
    public string Type { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
}
