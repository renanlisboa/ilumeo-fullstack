-- CreateTable
CREATE TABLE "Colaborador" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" TEXT NOT NULL,
    "dataEntrada" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataSaida" TIMESTAMP(3),
    "idColaborador" TEXT NOT NULL,

    CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_codigo_key" ON "Colaborador"("codigo");

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_idColaborador_fkey" FOREIGN KEY ("idColaborador") REFERENCES "Colaborador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
