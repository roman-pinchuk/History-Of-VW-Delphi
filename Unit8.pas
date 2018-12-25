unit Unit8;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Buttons, jpeg, ExtCtrls, StdCtrls;

type
  TForm8 = class(TForm)
    Image1: TImage;
    SpeedButton2: TSpeedButton;
    SpeedButton1: TSpeedButton;
    Label1: TLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure SpeedButton1Click(Sender: TObject);
    procedure SpeedButton2Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form8: TForm8;

implementation

uses Unit1, Unit2, Unit9, Unit11;

{$R *.dfm}

procedure TForm8.FormClose(Sender: TObject; var Action: TCloseAction);
begin
  form2.Show;
  form8.hide;
end;

procedure TForm8.SpeedButton1Click(Sender: TObject);
begin
 form8.Hide;
 form9.Show;
end;

procedure TForm8.SpeedButton2Click(Sender: TObject);
begin
 form8.Hide;
 form11.show;
end;

end.
