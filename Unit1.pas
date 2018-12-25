unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, jpeg, ExtCtrls, pngimage, StdCtrls;

type
  TForm1 = class(TForm)
    Image1: TImage;
    Image2: TImage;
    Image4: TImage;
    Image3: TImage;
    Image5: TImage;
    procedure Image4Click(Sender: TObject);
    procedure Image5Click(Sender: TObject);


  private
    { Private declarations }
  public
   function patch:string;
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

uses Unit2, Unit7;



{$R *.dfm}

function tform1.patch:string;
begin
  patch:=extractfilepath(paramstr(0));
end;





procedure TForm1.Image4Click(Sender: TObject);
 begin
    close
 end;

procedure TForm1.Image5Click(Sender: TObject);
 begin
  form1.Hide;
  form2.show;
 end;

end.
