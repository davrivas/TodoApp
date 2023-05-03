using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace TodoApp
{
    public interface ITodoAppService : IApplicationService
    {
        Task<List<TodoItemDto>> GetListAsync();
        Task<TodoItemDto> GetAsync(Guid id);
        Task<TodoItemDto> CreateAsync(string text);
        Task<TodoItemDto> UpdateAsync(Guid id, string text);
        Task DeleteAsync(Guid id);
    }
}