import { KTAGenerator, KTAGeneratorOptions } from "@/lib/kta-generator";

export class KTAPrintService {
  private printWindow: Window | null = null;
  
  private createPrintStyles(): string {
    return `
      <style>
        @media print {
          @page {
            margin: 10mm;
          }

          body {
            margin: 0;
            padding: 0;
          }
          
          .kta-container {
            width: 8.6cm;
            height: 5.4cm;
            display: block;
            page-break-inside: avoid;
          }
          
          .kta-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
          
          /* Hide everything else when printing */
          .preview-text {
            display: none !important;
          }
          
          .print-button {
            display: none !important;
          }
          
          /* Only show KTA container and image when printing */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
        
        @media screen {
          body {
            margin: 20px;
            font-family: Arial, sans-serif;
          }
          
          .preview-text {
            text-align: center;
            margin-bottom: 20px;
            font-size: 16px;
            color: #333;
          }
          
          .kta-container {
            border: 1px solid #ccc;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 0 auto;
            width: 8.6cm;
            height: 5.4cm;
          }
          
          .kta-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
          
          .print-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
          
          .print-button:hover {
            background: #0056b3;
          }
        }
      </style>
    `;
  }
  
  private createPrintHTML(imageDataUrl: string, userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>KTA ${userName}</title>
          ${this.createPrintStyles()}
        </head>
        <body>
          <div class="preview-text">KTA Preview - ${userName}</div>
          <div class="kta-container">
            <img class="kta-image" src="${imageDataUrl}" alt="KTA ${userName}" />
          </div>
          <button class="print-button" onclick="window.print()">Print KTA</button>
        </body>
      </html>
    `;
  }
  
  public async printKTA(options: KTAGeneratorOptions): Promise<void> {
    try {
      const generator = new KTAGenerator();
      const imageDataUrl = await generator.generateKTA(options);
      
      // Create print window
      this.printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!this.printWindow) {
        throw new Error('Unable to open print window. Please check popup blocker settings.');
      }
      
      // Write HTML content to print window
      const printHTML = this.createPrintHTML(imageDataUrl, options.data.namaAnggota);
      this.printWindow.document.write(printHTML);
      this.printWindow.document.close();
      
      // Wait for image to load before focusing
      this.printWindow.addEventListener('load', () => {
        setTimeout(() => {
          if (this.printWindow) {
            this.printWindow.focus();
          }
        }, 100);
      });
      
    } catch (error) {
      console.error('Failed to print KTA:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Gagal mencetak KTA. ';
      
      if (error instanceof Error) {
        if (error.message.includes('popup')) {
          errorMessage += 'Silakan aktifkan popup untuk browser ini.';
        } else if (error.message.includes('template')) {
          errorMessage += 'Template kartu tidak dapat dimuat.';
        } else {
          errorMessage += 'Silakan coba lagi.';
        }
      }
      
      alert(errorMessage);
      throw error;
    }
  }
  
  public async printMultipleKTA(dataList: KTAGeneratorOptions[]): Promise<void> {
    try {
      const generator = new KTAGenerator();
      const imageDataUrls: string[] = [];
      
      // Generate all KTA images
      for (const options of dataList) {
        const imageDataUrl = await generator.generateKTA(options);
        imageDataUrls.push(imageDataUrl);
      }
      
      // Create print window with multiple KTAs
      this.printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!this.printWindow) {
        throw new Error('Unable to open print window. Please check popup blocker settings.');
      }
      
      // Create HTML for multiple cards
      let multipleCardsHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Multiple KTA Print</title>
            ${this.createPrintStyles()}
            <style>
              .multiple-cards {
                display: flex;
                flex-wrap: wrap;
                gap: 5mm;
              }

              @media print {
                .preview-text {
                  display: none !important;
                }

                .print-button {
                  display: none !important;
                }

                .multiple-cards {
                  gap: 5mm;
                }

                .kta-container {
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="preview-text">Multiple KTA Print (${dataList.length} cards)</div>
            <div class="multiple-cards">
      `;
      
      // Add each card
      dataList.forEach((options, index) => {
        multipleCardsHTML += `
          <div class="kta-container">
            <img class="kta-image" src="${imageDataUrls[index]}" alt="KTA ${options.data.namaAnggota}" />
          </div>
        `;
      });
      
      multipleCardsHTML += `
            </div>
            <button class="print-button" onclick="window.print()">Print All KTA</button>
          </body>
        </html>
      `;
      
      this.printWindow.document.write(multipleCardsHTML);
      this.printWindow.document.close();
      
      // Focus print window
      this.printWindow.addEventListener('load', () => {
        setTimeout(() => {
          if (this.printWindow) {
            this.printWindow.focus();
          }
        }, 100);
      });
      
    } catch (error) {
      console.error('Failed to print multiple KTA:', error);
      alert('Gagal mencetak multiple KTA. Silakan coba lagi.');
      throw error;
    }
  }
  
  public closePrintWindow(): void {
    if (this.printWindow && !this.printWindow.closed) {
      this.printWindow.close();
      this.printWindow = null;
    }
  }
}

// Export singleton instance
export const ktaPrintService = new KTAPrintService();