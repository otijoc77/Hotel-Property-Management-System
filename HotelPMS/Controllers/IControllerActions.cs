using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    public interface IControllerActions<T>
    {
        Task<ActionResult<IEnumerable<T>>> Get();
        Task<ActionResult<T>> Get(int id);
        Task<ActionResult<T>> Post(T item);
        Task<ActionResult<T>> Delete(int id);
        Task<ActionResult<T>> Put(T item);
    }
}
