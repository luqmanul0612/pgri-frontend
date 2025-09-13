import { CetakKtaTableData } from "@/app/(dashboard)/cetak-kta/components/screens/printer-dtc/types";

export interface KTAGeneratorOptions {
  data: CetakKtaTableData;
  cardType: "CR80" | "CR79";
}

export class KTAGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private templateImg: HTMLImageElement | null = null;
  private userImg: HTMLImageElement | null = null;
  private qrImg: HTMLImageElement | null = null;

  // Dimensions in pixels (8.6cm x 5.4cm at 300 DPI)
  private readonly cardWidth = 1016; // 8.6cm * 300 DPI / 2.54
  private readonly cardHeight = 638; // 5.4cm * 300 DPI / 2.54

  // Photo dimensions (2cm x 3cm at 300 DPI)
  private readonly photoWidth = 236; // 2cm * 300 DPI / 2.54
  private readonly photoHeight = 354; // 3cm * 300 DPI / 2.54

  // QR code dimensions (2x2cm at 300 DPI)
  private readonly qrSize = 236; // 2cm * 300 DPI / 2.54

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.cardWidth;
    this.canvas.height = this.cardHeight;
    this.ctx = this.canvas.getContext("2d")!;
  }

  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private async loadTemplate(): Promise<void> {
    try {
      this.templateImg = await this.loadImage("/kta/template_kartu.png");
    } catch (error) {
      console.error("Failed to load template image:", error);
      throw error;
    }
  }

  private async loadUserPhoto(photoUrl?: string): Promise<void> {
    if (!photoUrl) return;

    try {
      this.userImg = await this.loadImage(photoUrl);
    } catch (error) {
      console.error("Failed to load user photo:", error);
      // Continue without photo if loading fails
    }
  }

  private async loadQRCode(): Promise<void> {
    // For now, use a hardcoded QR code image
    // Later this will come from backend
    try {
      // Create a simple QR placeholder for now
      const qrCanvas = document.createElement("canvas");
      qrCanvas.width = this.qrSize;
      qrCanvas.height = this.qrSize;
      const qrCtx = qrCanvas.getContext("2d")!;

      // Draw QR placeholder pattern
      qrCtx.fillStyle = "#000";
      qrCtx.fillRect(0, 0, this.qrSize, this.qrSize);
      qrCtx.fillStyle = "#fff";

      // Simple QR-like pattern
      const cellSize = this.qrSize / 25;
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 2 === 0) {
            qrCtx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }

      const qrDataUrl = qrCanvas.toDataURL();
      this.qrImg = await this.loadImage(qrDataUrl);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  }

  private drawTemplate(): void {
    if (!this.templateImg) return;

    // Draw template image scaled to fit canvas
    this.ctx.drawImage(this.templateImg, 0, 0, this.cardWidth, this.cardHeight);
  }

  private drawUserPhoto(): void {
    if (!this.userImg) return;

    // ===== MANUAL ADJUSTMENT AREA - PHOTO =====
    // Ubah nilai-nilai ini untuk menyesuaikan posisi dan ukuran foto:
    const photoX = 53.5; // Horizontal position foto (semakin besar = ke kanan)
    const photoY = 289; // Vertical position foto (semakin besar = ke bawah)
    const photoScaleWidth = 0.865; // Scale lebar foto (0.8 = 80% ukuran asli)
    const photoScaleHeight = 0.73; // Scale tinggi foto (0.8 = 80% ukuran asli)
    const borderRadius = 8; // Border radius untuk foto (pixels)
    // ============================================

    const adjustedPhotoWidth = this.photoWidth * photoScaleWidth;
    const adjustedPhotoHeight = this.photoHeight * photoScaleHeight;

    // Save canvas state
    this.ctx.save();

    // Create clipping path with rounded corners
    this.ctx.beginPath();
    this.ctx.roundRect(
      photoX,
      photoY,
      adjustedPhotoWidth,
      adjustedPhotoHeight,
      borderRadius,
    );
    this.ctx.clip();

    // Draw image within the clipped area
    this.ctx.drawImage(
      this.userImg,
      photoX,
      photoY,
      adjustedPhotoWidth,
      adjustedPhotoHeight,
    );

    // Restore canvas state
    this.ctx.restore();
  }

  private drawQRCode(): void {
    if (!this.qrImg) return;

    // ===== MANUAL ADJUSTMENT AREA - QR CODE =====
    // Ubah nilai-nilai ini untuk menyesuaikan posisi dan ukuran QR:
    const qrScale = 0.65; // Scale QR code (0.7 = 70% ukuran asli)
    const qrMarginRight = 47; // Margin dari kanan (semakin besar = lebih ke kiri)
    const qrMarginBottom = 48; // Margin dari bawah (semakin besar = lebih ke atas)
    const borderWidth = 2; // Lebar border QR code (pixels)
    const borderColor = "#000"; // Warna border QR code
    // =============================================

    const adjustedQRSize = this.qrSize * qrScale;
    const qrX = this.cardWidth - adjustedQRSize - qrMarginRight;
    const qrY = this.cardHeight - adjustedQRSize - qrMarginBottom;

    // Draw border for QR code
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = borderWidth;
    this.ctx.strokeRect(
      qrX - borderWidth / 2,
      qrY - borderWidth / 2,
      adjustedQRSize + borderWidth,
      adjustedQRSize + borderWidth,
    );

    // Draw QR code
    this.ctx.drawImage(this.qrImg, qrX, qrY, adjustedQRSize, adjustedQRSize);
  }

  private drawUserData(data: CetakKtaTableData): void {
    // Set text properties
    this.ctx.fillStyle = "#000";
    this.ctx.textAlign = "left";

    // ===== MANUAL ADJUSTMENT AREA =====
    // Ubah nilai-nilai ini untuk menyesuaikan posisi text:
    const textStartX = 300; // Horizontal position (semakin besar = ke kanan)
    const nameY = 309; // Vertical position nama (semakin besar = ke bawah)
    const npaY = 349; // Vertical position NPA (semakin besar = ke bawah)
    const agamaY = 389; // Vertical position agama (semakin besar = ke bawah)
    // ====================================

    // Draw name (larger, bold)
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText(data.namaAnggota, textStartX, nameY);

    // Draw NPA
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`NPA. ${data.npa}`, textStartX, npaY);

    // Draw agama
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`AGAMA: ${data.agama.toUpperCase()}`, textStartX, agamaY);
  }

  public async generateKTA(options: KTAGeneratorOptions): Promise<string> {
    const { data } = options;

    try {
      // Load all required assets
      await this.loadTemplate();
      await this.loadUserPhoto(data.foto);
      await this.loadQRCode();

      // Clear canvas
      this.ctx.clearRect(0, 0, this.cardWidth, this.cardHeight);

      // Draw components in order
      this.drawTemplate();
      this.drawUserPhoto();
      this.drawUserData(data);
      this.drawQRCode();

      // Return canvas as data URL
      return this.canvas.toDataURL("image/png", 1.0);
    } catch (error) {
      console.error("Failed to generate KTA:", error);
      throw error;
    }
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
