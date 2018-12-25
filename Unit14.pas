unit Unit14;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, jpeg;

type
  TForm14 = class(TForm)
    Timer1: TTimer;
    Image1: TImage;
    procedure FormCreate(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form14: TForm14;
  bm:TBitmap;x,y:Integer;

implementation

{$R *.dfm}

procedure TForm14.FormCreate(Sender: TObject);
begin
x:=50;
y:=Height+10; //чтобы текст выводился не сразу
bm:=TBitmap.Create;
bm.Width:=190;
bm.height:=height; //высота как у формы
bm.PixelFormat:=pf32bit;
Canvas.Font.Name:='Times New Roman';
bm.Canvas.Brush.Color:=clwhite;
bm.Canvas.FillRect(bm.Canvas.ClipRect);
timer1.Enabled:=True;
end;

procedure TForm14.Timer1Timer(Sender: TObject);
begin
 y:=y-1;
if y=-200 then y:=height+10;
with bm do begin
Canvas.Font.Color:=clblack;
Canvas.TextOut(x-10,y, 'История Volkswagen   v.1.01');
Canvas.Font.Color:=clblack;
Canvas.TextOut(x,y+15, 'Автор: Пинчук Роман');
Canvas.Font.Color:=clblack;
Canvas.TextOut(x-10,y+30,'Группа: 9ПО-31');
Canvas.Font.Color:=clgray;
Canvas.TextOut(x-8,y+45,'СПб ТКУиК 2010');
end;
Canvas.Draw(0,0,bm); //вырисовываем на форме объект Bitmap
end;

end.
