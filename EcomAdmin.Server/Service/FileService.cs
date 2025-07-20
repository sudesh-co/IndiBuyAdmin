namespace EcomAdmin.Server.Service
{
    public class FileService
    {
        public async Task<List<string>> SaveFilesAsync(IFormFileCollection files, string subfolder)
        {
            var savedFileNames = new List<string>();
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", subfolder);
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            foreach (var file in files)
            {
                //var uniqueName = $"{Guid.NewGuid()}_{file.FileName}";
                var filePath = Path.Combine(uploadPath, file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                savedFileNames.Add(file.FileName);
            }

            return savedFileNames;
        }
    }
}
