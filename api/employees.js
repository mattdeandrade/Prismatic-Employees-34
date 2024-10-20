const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (employee) res.json(employee);
    else next({ status: 404, message: `No employee with id:${id} exists.` });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;

  try {
    if (isNaN(name)) {
      const employee = await prisma.employee.create({ data: { name } });
      res.status(201).json(employee);
    } else
      return next({ status: 400, message: "An employee name is required" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({
        status: 404,
        message: `Cannot delete, employee with id:${id} does not exist.`,
      });
    } else {
      await prisma.employee.delete({ where: { id: +id } });
      return next({ status: 204, message: "" });
    }
  } catch (e) {
    next(e);
  }
});
