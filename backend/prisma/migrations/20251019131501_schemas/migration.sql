-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email_user" TEXT NOT NULL,
    "nome_user" TEXT NOT NULL,
    "senha_user" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "yml" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_user_key" ON "User"("email_user");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
