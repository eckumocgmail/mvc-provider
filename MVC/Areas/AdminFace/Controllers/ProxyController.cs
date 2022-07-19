using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProxyGateway.Middleware;

namespace ProxyGateway.Controllers
{
    [Area("AdminFace")]
    public class ProxyController : Controller
    {
        private readonly AdminDbContext _context;

        public ProxyController(AdminDbContext context)
        {
            _context = context;
        }

        // GET: ProxyDataModels
        public async Task<IActionResult> Index()
        {
            return View(await _context.ProxyUrlSegments.ToListAsync());
        }

        // GET: ProxyDataModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var proxyDataModel = await _context.ProxyUrlSegments
                .FirstOrDefaultAsync(m => m.ID == id);
            if (proxyDataModel == null)
            {
                return NotFound();
            }

            return View(proxyDataModel);
        }

        // GET: ProxyDataModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ProxyDataModels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]       
        public async Task<IActionResult> Create([Bind("IsSPA,ID,Path,Key,URL")] ProxyDataModel proxyDataModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(proxyDataModel);
                await _context.SaveChangesAsync();
                return View("Index");
            }
            return View(proxyDataModel);
        }

        // GET: ProxyDataModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var proxyDataModel = await _context.ProxyUrlSegments.FindAsync(id);
            if (proxyDataModel == null)
            {
                return NotFound();
            }
            return View(proxyDataModel);
        }

        // POST: ProxyDataModels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Path,Key,URL")] ProxyDataModel proxyDataModel)
        {
            if (id != proxyDataModel.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(proxyDataModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProxyDataModelExists(proxyDataModel.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(proxyDataModel);
        }

        // GET: ProxyDataModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var proxyDataModel = await _context.ProxyUrlSegments
                .FirstOrDefaultAsync(m => m.ID == id);
            if (proxyDataModel == null)
            {
                return NotFound();
            }

            return View(proxyDataModel);
        }

        // POST: ProxyDataModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var proxyDataModel = await _context.ProxyUrlSegments.FindAsync(id);
            _context.ProxyUrlSegments.Remove(proxyDataModel);
            await _context.SaveChangesAsync();
            return View("Index");
        }

        private bool ProxyDataModelExists(int id)
        {
            return _context.ProxyUrlSegments.Any(e => e.ID == id);
        }
    }
}
