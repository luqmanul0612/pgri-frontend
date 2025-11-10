"use client";

import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CardTypeDialogProps {
  children: React.ReactNode;
  onCardTypeSelect: (cardType: "CR80" | "CR79") => void;
  disabled?: boolean;
}

export const CardTypeDialog: FC<CardTypeDialogProps> = ({
  children,
  onCardTypeSelect,
  disabled = false,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pilih Tipe Kartu</DialogTitle>
          <DialogDescription>
            Pilih tipe kartu yang akan digunakan untuk mencetak KTA.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => onCardTypeSelect("CR80")}
            className="w-full"
            variant="default"
          >
            CR80
          </Button>
          <Button
            onClick={() => onCardTypeSelect("CR79")}
            className="w-full"
            variant="outline"
          >
            CR79
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
