-- CreateTable
CREATE TABLE "Dismissal" (
    "id" TEXT NOT NULL,
    "motive" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "dateOfIssuance" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dismissal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dismissal_documentId_key" ON "Dismissal"("documentId");

-- AddForeignKey
ALTER TABLE "Dismissal" ADD CONSTRAINT "Dismissal_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
