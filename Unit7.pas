unit Unit7;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, jpeg, ExtCtrls, Buttons, StdCtrls;

type
  TForm7 = class(TForm)
    ColorDialog1: TColorDialog;
    Image1: TImage;
    SpeedButton1: TSpeedButton;
    Button1: TButton;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure SpeedButton1Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form7: TForm7;

implementation

uses Unit3, PassWord;

{$R *.dfm}

procedure TForm7.Button1Click(Sender: TObject);
begin
  passwordDlg.show;
end;

procedure TForm7.FormClose(Sender: TObject; var Action: TCloseAction);
begin
 form7.hide;
end;

procedure TForm7.SpeedButton1Click(Sender: TObject);
begin
 if ColorDialog1.Execute then
 form3.frame41.color:=colordialog1.color;
 form3.frame51.color:=colordialog1.color;
 form3.frame61.color:=colordialog1.color;
end;

end.
