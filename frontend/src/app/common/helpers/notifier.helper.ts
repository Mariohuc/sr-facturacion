import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
declare var $: any;

@Injectable({ providedIn: "root" })
export class NotifierHelper {
  notifySuccess(message = "Guardado") {
    $.notify(
      {
        icon: "pe-7s-gift",
        message,
      },
      {
        type: "success",
        timer: 2000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }
  notifyError(error: any) {
    const message = this.getErrorMessageObject(error);
    $.notify(
      {
        icon: "pe-7s-gift",
        message: message.text,
      },
      {
        type: message.icon,
        timer: 2000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  private getErrorMessageObject(error: any) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          return {
            title: "Alerta",
            icon: "warning",
            text: "Solicitud erronea",
            confirmButtonText: "Aceptar",
          };
        case 401:
          return {
            title: "Alerta",
            icon: "warning",
            text: "Usted no esta autorizado para ejecutar esta acción",
            confirmButtonText: "Aceptar",
          };
        case 404:
          return {
            title: "Alerta",
            icon: "warning",
            text: "Recurso no encontrado",
            confirmButtonText: "Aceptar",
          };
        case 500:
          return {
            title: "Error",
            icon: "danger",
            text: "Por favor intentelo en otro momento",
            confirmButtonText: "Aceptar",
          };
        default:
          return {
            title: "Error",
            icon: "danger",
            text: "Procesamiento fallido",
            confirmButtonText: "Aceptar",
          };
      }
    } else {
      return {
        title: "Error",
        icon: "error",
        text: "Procesamiento fallido",
        confirmButtonText: "Aceptar",
      };
    }
  }
}
