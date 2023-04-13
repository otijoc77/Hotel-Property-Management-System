using Microsoft.EntityFrameworkCore;
using HotelPMS.Models;
using HotelPMS.Repositories;
using HotelPMS.Services;
using System.Text.Json.Serialization;
using HotelPMS.Hubs;

namespace HotelPMS
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            builder.Services.AddTransient<ICompanyService, CompanyService>();
            builder.Services.AddTransient<IHotelService, HotelService>();
            builder.Services.AddTransient<IFloorService, FloorService>();
            builder.Services.AddTransient<IRoomService, RoomService>();
            builder.Services.AddTransient<IReservationService, ReservationService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<ICountryService, CountryService>();

            builder.Services.AddDbContext<Context>(options =>
            {
                options.UseInMemoryDatabase("PMS");
            });

            builder.Services.AddSignalR();

            builder.Services.AddControllers()
            .AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            builder.Services.AddControllersWithViews();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod()
                 .AllowAnyHeader().SetIsOriginAllowed(origin => true));
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(x => x
                .SetIsOriginAllowed(origin => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            app.MapHub<RequestHub>("/hubs/requests");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}