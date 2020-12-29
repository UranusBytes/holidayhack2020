function solveProblem(arg) {
  arg.reduce((total, number) => {
    return number.reduce((total2, number2) => {
      return (!isNaN(number2) ? number2 : 0);
    })
  })
}
elf.moveDown(1);
for (i = 0; i < 7; i++) {
  elf.pull_lever(i)
  if (i == 0 || i == 4) {
    elf.moveLeft(i + 2);
  }
  if (i == 1 || i == 5) {
    elf.moveUp(i + 2);
  }
  if (i == 2 || i == 6) {
    elf.moveRight(i + 2);
  }
  if (i == 3) {
    elf.moveDown(i + 2);
  }
}
elf.moveUp(2)
elf.moveLeft(4)
elf.tell_munch(solveProblem)
elf.moveUp(2)
