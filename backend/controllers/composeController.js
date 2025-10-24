import prisma from "../lib/prisma.js";

export const getComposes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.json({ msg: "Não pode ser vazio!" });

    const composes = await prisma.history.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return res.json({ composes: composes });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompose = async (req, res) => {
  try {
    const { idUser, idCompose } = req.params;

    if (!idUser || !idCompose) return res.json({ msg: "Id não encontrado!" });
    const result = await prisma.history.delete({
      where: {
        userId: Number(idUser),
        id: Number(idCompose),
      },
    });

    res.json({ msg: "Compose deletado!" });
  } catch (error) {
    console.log(error);
  }
};

// docker exec -it dockly_db psql -U admin -d dockly
