using HotelPMS.Controllers;
using HotelPMS.Models;
using HotelPMS.Models.Enums;
using HotelPMS.Repositories;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NuGet.ProjectModel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Tests.ServiceTests
{
    internal class RoomServiceTests
    {
        private Mock<IRoomRepository> _repository;
        private Mock<ILogger<RoomsController>> _logger;
        private Mock<IRepositoryWrapper> _wrapper;
        private RoomService _service;
        private List<Room> _list = new();
        private Room _item = new();

        private bool Equals(Room a1, Room a2)
        {
            return a1.Id.Equals(a2.Id)
                && a1.Number.Equals(a2.Number)
                && a1.Area.Equals(a2.Area)
                && a1.Beds.Equals(a2.Beds)
                && a1.Price.Equals(a2.Price)
                && a1.Type.Equals(a2.Type)
                && a1.Image.Equals(a2.Image)
                && a1.Border.Equals(a2.Border)
                && a1.FloorId.Equals(a2.FloorId);
        }
        public static Room Get(int id, int num)
        {
            Room a = new();
            a.Id = id;
            a.Number = num;
            a.Area = 1;
            a.Beds = 1;
            a.Price = 1;
            a.Type = "T";
            a.Image = "i";
            a.Border = "b";
            a.FloorId = 1;
            return a;
        }

        [OneTimeSetUp]
        public void Setup()
        {
            Room a1 = Get(1, 1);
            _item = a1;
            Room a2 = Get(2, 2);
            _list.Add(a1);
            _list.Add(a2);
            _logger = new Mock<ILogger<RoomsController>>(MockBehavior.Strict);
            _repository = new Mock<IRoomRepository>(MockBehavior.Strict);
            _wrapper = new Mock<IRepositoryWrapper>(MockBehavior.Strict);
            _wrapper.Setup(w => w.Room).Returns(_repository.Object);
            _service = new(_wrapper.Object);
        }

        [Test]
        public async Task GetAll_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(_list));
            RoomsController _controller = new(_logger.Object, _service);

            //Act
            List<Room> list = await _service.GetAllAsync();
            var res = _controller.Get();

            //Assert
            Assert.That(_list.Count, Is.EqualTo(2));
            Assert.That(Equals(_list.First(), list.First()));
            Assert.That(Equals(res.Result.Value.First(), _list.First()));
        }

        [Test]
        public async Task Get_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAsync(1)).Returns(Task.FromResult(_item));
            RoomsController _controller = new(_logger.Object, _service);

            //Act
            Room item = await _service.GetByIdAsync(1);
            var res = _controller.Get(1);

            Assert.That(Equals(_list.First(), item));
            Assert.That(Equals(res.Result.Value, _list.First()));
        }

        [Test]
        public async Task Create_GoodData_PassAsync()
        {
            //Arrange
            Room a = Get(3, 3);
            _repository.Setup(r => r.AddAsync(a)).Returns(Task.FromResult(a));
            _repository.Setup(r => r.GetAsync(3)).Returns(Task.FromResult(a));
            RoomsController _controller = new(_logger.Object, _service);

            //Act
            Room item = await _service.CreateAsync(a);
            var res = await _controller.Post(a);
            var temp = res.Result as CreatedAtActionResult;
            Assert.That(Equals(a, item));
            Assert.That(Equals(temp.Value, a));
        }

        [Test]
        public async Task Delete_GoodData_PassAsync()
        {
            //Arrange
            Room a = Get(3, 3);
            _repository.Setup(r => r.DeleteAsync(a.Id)).Returns(Task.FromResult(a));
            RoomsController _controller = new(_logger.Object, _service);

            //Act
            Room item = await _service.DeleteAsync(a.Id);
            var res = await _controller.Delete(a.Id);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task Update_GoodData_PassAsync()
        {
            //Arrange
            Room a = Get(3, 3);
            _repository.Setup(r => r.UpdateAsync(a)).Returns(Task.FromResult(a));
            RoomsController _controller = new(_logger.Object, _service);

            //Act
            Room item = await _service.UpdateAsync(a);
            var res = await _controller.Put(a);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task GetCondition_GoodData_PassAsync()
        {
            //Arrange
            Room a = Get(3, 3);
            _repository.Setup(r => r.GetByConditionAsync(x => x.Id == 3)).Returns(Task.FromResult(new List<Room> { a }));

            //Act
            List<Room> list = await _service.GetByConditionAsync(x => x.Id == 3);
            Assert.That(Equals(a, list.First()));
        }
    }
}
