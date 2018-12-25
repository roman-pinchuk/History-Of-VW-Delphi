unit Unit2;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, OleCtrls, SHDocVw, ComCtrls, pngimage, ExtCtrls, jpeg, GIFImg,
  MPlayer, Buttons, StdCtrls;

type
  TForm2 = class(TForm)
    Image2: TImage;
    Image1: TImage;
    Image3: TImage;
    Image4: TImage;
    Image5: TImage;
    Image6: TImage;
    Image7: TImage;
    Image8: TImage;
    Image9: TImage;
    procedure Image1Click(Sender: TObject);
    procedure Image6Click(Sender: TObject);
    procedure FormClose(Sender: TObject;var Action: TCloseAction);
    procedure Image7Click(Sender: TObject);
    procedure Image8Click(Sender: TObject);
    procedure Image9Click(Sender: TObject);
    procedure Image5Click(Sender: TObject);
     private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form2: TForm2;

implementation

uses Unit1, Unit3, Unit7, Unit8, Unit14, Unit13;

{$R *.dfm}

procedure TForm2.FormClose(Sender: TObject; var Action: TCloseAction);
begin
  form1.Show;
  form2.hide;
end;

procedure TForm2.Image1Click(Sender: TObject);
begin
form1.close;
end;



procedure TForm2.Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm2.Image6Click(Sender: TObject);
begin
  form1.Show;
  form2.Close;
end;

procedure TForm2.Image7Click(Sender: TObject);
begin
   form2.Close;
   form3.show;
   form1.Hide;
end;

procedure TForm2.Image8Click(Sender: TObject);
begin
 form7.show;
end;

procedure TForm2.Image9Click(Sender: TObject);
begin
 form2.Hide;
 form8.show;
end;

end.
